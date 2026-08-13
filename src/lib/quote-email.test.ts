import { describe, expect, it } from "vitest";
import {
  buildQuoteEmailPayload,
  buildQuoteHtml,
  buildQuoteSubject,
  escapeHtml,
} from "./quote-email";
import type { QuoteRequest } from "./quote-request";

function request(overrides: Partial<QuoteRequest> = {}): QuoteRequest {
  return {
    name: "Rodrigo Pérez",
    company: "Comercio del Centro",
    email: "rodrigo@example.com",
    phone: "+598 98 123 456",
    jobType: "bolsas",
    jobTypeLabel: "Bolsas de papel",
    details: "Necesito 500 bolsas kraft.",
    questions: ["¿Cuántas bolsas necesitás?", "¿Qué medida?"],
    receivedAt: "2026-08-06T15:00:00.000Z",
    ...overrides,
  };
}

describe("quote email", () => {
  it("escapa HTML en todo contenido aportado por el usuario", () => {
    const unsafe = request({
      name: '<img src=x onerror="alert(1)">',
      company: "A&B <script>",
      details: "<script>alert('x')</script>\nsegunda línea",
    });
    const html = buildQuoteHtml(unsafe);

    expect(escapeHtml("<&\"'>")).toBe("&lt;&amp;&quot;&#039;&gt;");
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("A&amp;B");
  });

  it("elimina saltos de línea capaces de inyectar headers", () => {
    const subject = buildQuoteSubject(
      request({ name: "Rodrigo\r\nBcc: atacante@example.com" }),
    );

    expect(subject).not.toMatch(/[\r\n]/);
    expect(subject).toBe(
      "Nuevo pedido de presupuesto · Bolsas de papel · Rodrigo Bcc: atacante@example.com",
    );
  });

  it("genera el payload completo para Resend", () => {
    const payload = buildQuoteEmailPayload(
      {
        from: "Imprenta Magenta Web <presupuestos@send.magentauruguay.com>",
        to: "info@magentauruguay.com",
      },
      request(),
    );

    expect(payload).toMatchObject({
      from: "Imprenta Magenta Web <presupuestos@send.magentauruguay.com>",
      to: ["info@magentauruguay.com"],
      replyTo: "rodrigo@example.com",
      subject:
        "Nuevo pedido de presupuesto · Bolsas de papel · Rodrigo Pérez",
    });
    expect(payload.text).toContain("DATOS DEL CLIENTE");
    expect(payload.text).toContain("PREGUNTAS ORIENTATIVAS");
    expect(payload.text).toContain("2026-08-06T15:00:00.000Z");
    expect(payload.html).toContain("Datos del trabajo");
  });
});
