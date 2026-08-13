import {
  isValidEmailAddress,
  normalizeSingleLine,
  type QuoteRequest,
} from "./quote-request";

export type QuoteEmailConfiguration = {
  from: string;
  to: string;
};

export type QuoteEmailPayload = {
  from: string;
  to: string[];
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

export function sanitizeHeaderValue(value: string, maxLength = 180): string {
  return normalizeSingleLine(value).slice(0, maxLength);
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });
}

export function hasUnsafeControlCharacters(value: string): boolean {
  return /[\u0000-\u001f\u007f]|\p{Cf}/u.test(value);
}

function senderAddress(value: string): string | null {
  if (hasUnsafeControlCharacters(value)) return null;

  const trimmed = value.trim();
  const friendlyAddress = trimmed.match(/^[^<>]+<([^<>]+)>$/);

  if (friendlyAddress) return friendlyAddress[1].trim();
  if (trimmed.includes("<") || trimmed.includes(">")) return null;

  return trimmed;
}

export function isValidQuoteEmailConfiguration(
  configuration: QuoteEmailConfiguration,
): boolean {
  const fromAddress = senderAddress(configuration.from);
  const recipient = sanitizeHeaderValue(configuration.to);

  return Boolean(
    fromAddress &&
      isValidEmailAddress(fromAddress) &&
      recipient === configuration.to.trim() &&
      isValidEmailAddress(recipient),
  );
}

export function buildQuoteSubject(request: QuoteRequest): string {
  return sanitizeHeaderValue(
    `Nuevo pedido de presupuesto · ${request.jobTypeLabel} · ${request.name}`,
  );
}

function receiptLabel(receivedAt: string): string {
  const formatted = new Intl.DateTimeFormat("es-UY", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Montevideo",
  }).format(new Date(receivedAt));

  return `${formatted} (${receivedAt})`;
}

export function buildQuoteText(request: QuoteRequest): string {
  const questions = request.questions.map(
    (question, index) => `${index + 1}. ${question}`,
  );

  return [
    "Nuevo pedido de presupuesto",
    "",
    "DATOS DEL CLIENTE",
    `Nombre: ${request.name}`,
    `Empresa o comercio: ${request.company || "No indicado"}`,
    `Email: ${request.email}`,
    `Teléfono / WhatsApp: ${request.phone}`,
    "",
    "DATOS DEL TRABAJO",
    `Tipo: ${request.jobTypeLabel}`,
    "Detalles:",
    request.details,
    "",
    "PREGUNTAS ORIENTATIVAS PARA EL TIPO SELECCIONADO",
    ...questions,
    "",
    `Fecha y hora de recepción: ${receiptLabel(request.receivedAt)}`,
  ].join("\n");
}

export function buildQuoteHtml(request: QuoteRequest): string {
  const details = escapeHtml(request.details).replace(/\n/g, "<br>");
  const questions = request.questions
    .map((question) => `<li>${escapeHtml(question)}</li>`)
    .join("");

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;background:#f8fafc;color:#0f172a;font-family:Arial,Helvetica,sans-serif;line-height:1.55">
    <main style="max-width:680px;margin:0 auto;padding:32px 20px">
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:28px">
        <h1 style="margin:0 0 24px;font-size:24px;color:#be185d">Nuevo pedido de presupuesto</h1>
        <h2 style="margin:24px 0 12px;font-size:17px">Datos del cliente</h2>
        <p style="margin:6px 0"><strong>Nombre:</strong> ${escapeHtml(request.name)}</p>
        <p style="margin:6px 0"><strong>Empresa o comercio:</strong> ${escapeHtml(request.company || "No indicado")}</p>
        <p style="margin:6px 0"><strong>Email:</strong> ${escapeHtml(request.email)}</p>
        <p style="margin:6px 0"><strong>Teléfono / WhatsApp:</strong> ${escapeHtml(request.phone)}</p>

        <h2 style="margin:28px 0 12px;font-size:17px">Datos del trabajo</h2>
        <p style="margin:6px 0"><strong>Tipo:</strong> ${escapeHtml(request.jobTypeLabel)}</p>
        <p style="margin:12px 0 6px"><strong>Detalles:</strong></p>
        <p style="margin:0;padding:14px;background:#f8fafc;border-radius:10px">${details}</p>

        <h3 style="margin:24px 0 10px;font-size:15px">Preguntas orientativas para el tipo seleccionado</h3>
        <ol style="margin:0;padding-left:22px">${questions}</ol>

        <p style="margin:28px 0 0;padding-top:18px;border-top:1px solid #e2e8f0;font-size:13px;color:#475569">
          <strong>Fecha y hora de recepción:</strong> ${escapeHtml(receiptLabel(request.receivedAt))}
        </p>
      </div>
    </main>
  </body>
</html>`;
}

export function buildQuoteEmailPayload(
  configuration: QuoteEmailConfiguration,
  request: QuoteRequest,
): QuoteEmailPayload {
  return {
    from: configuration.from,
    to: [configuration.to],
    replyTo: request.email,
    subject: buildQuoteSubject(request),
    text: buildQuoteText(request),
    html: buildQuoteHtml(request),
  };
}
