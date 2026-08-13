import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  INITIAL_QUOTE_FORM_STATE,
  MIN_QUOTE_SUBMISSION_MS,
} from "@/lib/quote-request";
import {
  TURNSTILE_ACTION,
  TURNSTILE_PRODUCTION_HOSTNAMES,
  TURNSTILE_TOKEN_FIELD,
} from "@/lib/turnstile";

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

const { submitQuoteRequest } = await import("./actions");

const VALID_TOKEN = "token-de-prueba";

function buildFormData(overrides: Record<string, unknown> = {}): FormData {
  const formData = new FormData();
  const fields: Record<string, unknown> = {
    name: "Rodrigo Pérez",
    company: "Comercio del Centro",
    email: "rodrigo@example.com",
    phone: "+598 98 123 456",
    jobType: "bolsas",
    details: "Necesito 500 bolsas kraft de tamaño mediano.",
    website: "",
    formStartedAt: String(Date.now() - MIN_QUOTE_SUBMISSION_MS - 1000),
    [TURNSTILE_TOKEN_FIELD]: VALID_TOKEN,
    ...overrides,
  };

  for (const [key, value] of Object.entries(fields)) {
    if (value instanceof Blob) formData.set(key, value);
    else formData.set(key, String(value));
  }

  return formData;
}

function stubSiteverify(payload: unknown, ok = true) {
  const fetchMock = vi.fn().mockResolvedValue({ ok, json: async () => payload });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function verifiedPayload(overrides: Record<string, unknown> = {}) {
  return {
    success: true,
    action: TURNSTILE_ACTION,
    hostname: TURNSTILE_PRODUCTION_HOSTNAMES[0],
    ...overrides,
  };
}

function submit(formData: FormData) {
  return submitQuoteRequest(INITIAL_QUOTE_FORM_STATE, formData);
}

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "re_clave_de_prueba");
  vi.stubEnv("TURNSTILE_SECRET_KEY", "secreto-turnstile-de-prueba");
  vi.stubEnv(
    "MAGENTA_QUOTE_FROM",
    "Imprenta Magenta Web <presupuestos@send.magentauruguay.com>",
  );
  vi.stubEnv("MAGENTA_QUOTE_TO", "info@magentauruguay.com");

  sendMock.mockReset();
  sendMock.mockResolvedValue({ data: { id: "email-de-prueba" }, error: null });
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("submitQuoteRequest · Turnstile antes de Resend", () => {
  it("con token válido verifica y recién entonces envía el email", async () => {
    const fetchMock = stubSiteverify(verifiedPayload());

    const state = await submit(buildFormData());

    expect(state.status).toBe("success");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledTimes(1);

    const order = fetchMock.mock.invocationCallOrder[0];
    expect(order).toBeLessThan(sendMock.mock.invocationCallOrder[0]);
  });

  it("sin token no llama a Resend", async () => {
    const fetchMock = stubSiteverify(verifiedPayload());

    const state = await submit(
      buildFormData({ [TURNSTILE_TOKEN_FIELD]: "" }),
    );

    expect(state.status).toBe("verification_error");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("con un token que no es string no llama a Resend", async () => {
    const fetchMock = stubSiteverify(verifiedPayload());

    const state = await submit(
      buildFormData({ [TURNSTILE_TOKEN_FIELD]: new Blob(["token"]) }),
    );

    expect(state.status).toBe("verification_error");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("con token inválido no llama a Resend", async () => {
    stubSiteverify({ success: false, "error-codes": ["invalid-input-response"] });

    const state = await submit(buildFormData());

    expect(state.status).toBe("verification_error");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("con token expirado o reutilizado no llama a Resend", async () => {
    stubSiteverify({ success: false, "error-codes": ["timeout-or-duplicate"] });

    const state = await submit(buildFormData());

    expect(state.status).toBe("verification_error");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("con una action distinta no llama a Resend", async () => {
    stubSiteverify(verifiedPayload({ action: "otro_form" }));

    const state = await submit(buildFormData());

    expect(state.status).toBe("verification_error");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("con un hostname no permitido no llama a Resend", async () => {
    stubSiteverify(
      verifiedPayload({ hostname: "magenta-paysandu-m5in.vercel.app" }),
    );

    const state = await submit(buildFormData());

    expect(state.status).toBe("verification_error");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("ante un fallo de red de Siteverify falla cerrado", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")));

    const state = await submit(buildFormData());

    expect(state.status).toBe("verification_error");
    expect(sendMock).not.toHaveBeenCalled();
  });
});

describe("submitQuoteRequest · configuración", () => {
  it.each(["RESEND_API_KEY", "TURNSTILE_SECRET_KEY", "MAGENTA_QUOTE_TO"])(
    "devuelve configuration_error si falta %s",
    async (variable) => {
      vi.stubEnv(variable, "");
      const fetchMock = stubSiteverify(verifiedPayload());

      const state = await submit(buildFormData());

      expect(state.status).toBe("configuration_error");
      expect(fetchMock).not.toHaveBeenCalled();
      expect(sendMock).not.toHaveBeenCalled();
    },
  );
});

describe("submitQuoteRequest · barreras previas intactas", () => {
  it("el honeypot corta antes de Siteverify y de Resend", async () => {
    const fetchMock = stubSiteverify(verifiedPayload());

    const state = await submit(
      buildFormData({ website: "https://spam.example" }),
    );

    expect(state.status).toBe("validation_error");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("el tiempo mínimo corta antes de Siteverify y de Resend", async () => {
    const fetchMock = stubSiteverify(verifiedPayload());

    const state = await submit(
      buildFormData({ formStartedAt: String(Date.now()) }),
    );

    expect(state.status).toBe("validation_error");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("un jobType manipulado sigue siendo rechazado", async () => {
    const fetchMock = stubSiteverify(verifiedPayload());

    const state = await submit(buildFormData({ jobType: "__proto__" }));

    expect(state.status).toBe("validation_error");
    expect(state.fieldErrors?.jobType).toMatch(/válido/i);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("un email inválido se rechaza antes de Siteverify", async () => {
    const fetchMock = stubSiteverify(verifiedPayload());

    const state = await submit(buildFormData({ email: "sin-dominio" }));

    expect(state.status).toBe("validation_error");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });
});

describe("submitQuoteRequest · estado público", () => {
  it("verification_error no marca campos, así el formulario los conserva", async () => {
    stubSiteverify({ success: false, "error-codes": ["invalid-input-response"] });

    const state = await submit(buildFormData());

    expect(state.fieldErrors).toBeUndefined();
    expect(state.message).toMatch(/verificación de seguridad/i);
  });

  it("delivery_error no marca campos, así el formulario los conserva", async () => {
    stubSiteverify(verifiedPayload());
    sendMock.mockResolvedValue({ data: null, error: { message: "rate limited" } });

    const state = await submit(buildFormData());

    expect(state.status).toBe("delivery_error");
    expect(state.fieldErrors).toBeUndefined();
  });

  it("una excepción de Resend también devuelve delivery_error", async () => {
    stubSiteverify(verifiedPayload());
    sendMock.mockRejectedValue(new Error("network down"));

    const state = await submit(buildFormData());

    expect(state.status).toBe("delivery_error");
  });

  it("no filtra token, secreto, hostname ni error-codes de Cloudflare", async () => {
    stubSiteverify(
      verifiedPayload({
        success: false,
        hostname: "hostname-interno.example",
        "error-codes": ["invalid-input-secret"],
      }),
    );

    const state = await submit(buildFormData());
    const serialized = JSON.stringify(state);

    expect(serialized).not.toContain(VALID_TOKEN);
    expect(serialized).not.toContain("secreto-turnstile-de-prueba");
    expect(serialized).not.toContain("hostname-interno.example");
    expect(serialized).not.toContain("invalid-input-secret");
  });

  it("el éxito devuelve un estado limpio para vaciar el formulario", async () => {
    stubSiteverify(verifiedPayload());

    const state = await submit(buildFormData());

    expect(state).toEqual({
      status: "success",
      message: expect.stringContaining("Magenta recibió tu solicitud"),
    });
  });
});
