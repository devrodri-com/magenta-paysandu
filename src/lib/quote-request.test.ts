import { describe, expect, it } from "vitest";
import {
  MIN_QUOTE_SUBMISSION_MS,
  QUOTE_FIELD_LIMITS,
  toPublicQuoteFailure,
  validateQuoteRequest,
  type RawQuoteRequest,
} from "./quote-request";

const NOW = Date.parse("2026-08-06T15:00:00.000Z");

function validRaw(overrides: Partial<RawQuoteRequest> = {}): RawQuoteRequest {
  return {
    name: "Rodrigo Pérez",
    company: "Comercio del Centro",
    email: "rodrigo@example.com",
    phone: "+598 98 123 456",
    jobType: "bolsas",
    details: "Necesito 500 bolsas kraft de tamaño mediano.",
    website: "",
    formStartedAt: String(NOW - MIN_QUOTE_SUBMISSION_MS - 1000),
    ...overrides,
  };
}

describe("validateQuoteRequest", () => {
  it("acepta una solicitud válida e incorpora las preguntas definidas", () => {
    const result = validateQuoteRequest(validRaw(), NOW);

    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.data.jobType).toBe("bolsas");
    expect(result.data.jobTypeLabel).toBe("Bolsas de papel");
    expect(result.data.questions.length).toBeGreaterThan(0);
    expect(result.data.receivedAt).toBe("2026-08-06T15:00:00.000Z");
  });

  it("rechaza un email inválido", () => {
    const result = validateQuoteRequest(
      validRaw({ email: "correo-sin-dominio" }),
      NOW,
    );

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.fieldErrors.email).toMatch(/email válido/i);
  });

  it.each([
    "<victim@example.com>",
    "victim@example.com,evil.test",
    "victim@example..com",
  ])("rechaza emails ambiguos para headers: %s", (email) => {
    const result = validateQuoteRequest(validRaw({ email }), NOW);

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.fieldErrors.email).toMatch(/email válido/i);
  });

  it("rechaza un tipo de trabajo desconocido", () => {
    const result = validateQuoteRequest(validRaw({ jobType: "otro" }), NOW);

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.fieldErrors.jobType).toMatch(/válido/i);
  });

  it("rechaza los campos obligatorios vacíos", () => {
    const result = validateQuoteRequest(
      validRaw({ name: "", email: "", phone: "", jobType: "", details: "" }),
      NOW,
    );

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.fieldErrors).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      phone: expect.any(String),
      jobType: expect.any(String),
      details: expect.any(String),
    });
  });

  it.each([
    ["name", "x".repeat(QUOTE_FIELD_LIMITS.name.max + 1)],
    ["company", "x".repeat(QUOTE_FIELD_LIMITS.company.max + 1)],
    ["email", `${"x".repeat(QUOTE_FIELD_LIMITS.email.max)}@example.com`],
    ["phone", "1".repeat(QUOTE_FIELD_LIMITS.phone.max + 1)],
    ["details", "x".repeat(QUOTE_FIELD_LIMITS.details.max + 1)],
  ] as const)("rechaza longitud excesiva en %s", (field, value) => {
    const result = validateQuoteRequest(validRaw({ [field]: value }), NOW);

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.fieldErrors[field]).toMatch(/superar/i);
  });

  it("rechaza el honeypot completado", () => {
    const result = validateQuoteRequest(
      validRaw({ website: "https://spam.example" }),
      NOW,
    );

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.formError).toMatch(/validar el envío/i);
    expect(result.fieldErrors).toEqual({});
  });

  it("rechaza un envío imposiblemente rápido", () => {
    const result = validateQuoteRequest(
      validRaw({ formStartedAt: String(NOW - MIN_QUOTE_SUBMISSION_MS + 1) }),
      NOW,
    );

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.formError).toMatch(/esperá un momento/i);
  });

  it("normaliza espacios y saltos sin destruir párrafos", () => {
    const result = validateQuoteRequest(
      validRaw({
        name: "  Rodrigo   Pérez  ",
        company: "  Comercio   del Centro ",
        email: "  RODRIGO@EXAMPLE.COM ",
        details: "  Primera   línea \r\n\r\n\r\n Segunda\t línea  ",
      }),
      NOW,
    );

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.name).toBe("Rodrigo Pérez");
    expect(result.data.company).toBe("Comercio del Centro");
    expect(result.data.email).toBe("rodrigo@example.com");
    expect(result.data.details).toBe("Primera línea\n\nSegunda línea");
  });

  it("rechaza contenido compuesto por caracteres invisibles", () => {
    const invisible = "\u200B";
    const result = validateQuoteRequest(
      validRaw({
        name: invisible.repeat(2),
        phone: invisible.repeat(6),
        details: invisible.repeat(10),
      }),
      NOW,
    );

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.fieldErrors).toMatchObject({
      name: expect.any(String),
      phone: expect.any(String),
      details: expect.any(String),
    });
  });
});

describe("public errors", () => {
  it("no expone secretos ni datos personales de errores internos", () => {
    const publicError = toPublicQuoteFailure("delivery_error", {
      message: "re_super_secret failed for rodrigo@example.com",
    });
    const serialized = JSON.stringify(publicError);

    expect(serialized).not.toContain("re_super_secret");
    expect(serialized).not.toContain("rodrigo@example.com");
    expect(publicError.status).toBe("delivery_error");
  });
});
