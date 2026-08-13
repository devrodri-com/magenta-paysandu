"use server";

import { Resend } from "resend";
import {
  buildQuoteEmailPayload,
  hasUnsafeControlCharacters,
  isValidQuoteEmailConfiguration,
  type QuoteEmailConfiguration,
} from "@/lib/quote-email";
import {
  toPublicQuoteFailure,
  validateQuoteRequest,
  type QuoteFormState,
  type RawQuoteRequest,
} from "@/lib/quote-request";
import { TURNSTILE_TOKEN_FIELD, verifyTurnstileToken } from "@/lib/turnstile";

type QuoteConfiguration = QuoteEmailConfiguration & {
  apiKey: string;
  turnstileSecret: string;
};

function formValue(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function readRequest(formData: FormData): RawQuoteRequest {
  return {
    name: formValue(formData, "name"),
    company: formValue(formData, "company"),
    email: formValue(formData, "email"),
    phone: formValue(formData, "phone"),
    jobType: formValue(formData, "jobType"),
    details: formValue(formData, "details"),
    website: formValue(formData, "website"),
    formStartedAt: formValue(formData, "formStartedAt"),
  };
}

function readConfiguration(): QuoteConfiguration | null {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim() ?? "";
  const from = process.env.MAGENTA_QUOTE_FROM?.trim() ?? "";
  const to = process.env.MAGENTA_QUOTE_TO?.trim() ?? "";
  const emailConfiguration = { from, to };

  if (
    !apiKey ||
    !turnstileSecret ||
    !from ||
    !to ||
    hasUnsafeControlCharacters(apiKey) ||
    hasUnsafeControlCharacters(turnstileSecret) ||
    !isValidQuoteEmailConfiguration(emailConfiguration)
  ) {
    return null;
  }

  return { apiKey, turnstileSecret, ...emailConfiguration };
}

export async function submitQuoteRequest(
  previousState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  void previousState;

  const validation = validateQuoteRequest(readRequest(formData));

  if (!validation.success) {
    return {
      status: "validation_error",
      message:
        validation.formError ?? "Revisá los campos indicados antes de enviar.",
      fieldErrors: validation.fieldErrors,
    };
  }

  const configuration = readConfiguration();
  if (!configuration) {
    return toPublicQuoteFailure("configuration_error");
  }

  const { apiKey, turnstileSecret, ...emailConfiguration } = configuration;

  // Turnstile es el último gate antes de Resend: si no queda verificado, el
  // envío se corta acá y el proveedor de email nunca se invoca.
  const verification = await verifyTurnstileToken({
    token: formData.get(TURNSTILE_TOKEN_FIELD),
    secret: turnstileSecret,
  });

  if (verification !== "verified") {
    return toPublicQuoteFailure(
      verification === "not_configured"
        ? "configuration_error"
        : "verification_error",
    );
  }

  const payload = buildQuoteEmailPayload(emailConfiguration, validation.data);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send(payload);

    if (error) {
      return toPublicQuoteFailure("delivery_error", error);
    }
  } catch (error) {
    return toPublicQuoteFailure("delivery_error", error);
  }

  return {
    status: "success",
    message:
      "Magenta recibió tu solicitud. Si querés agregar información, podés escribirnos por WhatsApp.",
  };
}
