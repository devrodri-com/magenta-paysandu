import { QUESTION_SETS } from "../data/questionSets";

export const QUOTE_FIELD_LIMITS = {
  name: { min: 2, max: 100 },
  company: { max: 120 },
  email: { max: 254 },
  phone: { min: 6, max: 40 },
  details: { min: 10, max: 4000 },
} as const;

export const MIN_QUOTE_SUBMISSION_MS = 1500;

export type QuoteJobType = keyof typeof QUESTION_SETS;

const JOB_TYPE_LABELS = {
  libretas: "Libretas",
  tarjetas: "Tarjetas personales",
  afiches: "Afiches",
  bonos: "Bonos",
  anotadores: "Anotadores",
  carpetas: "Carpetas",
  volantes: "Volantes",
  bolsas: "Bolsas de papel",
  adhesivos: "Adhesivos",
} as const satisfies Record<QuoteJobType, string>;

export const JOB_TYPE_OPTIONS = (Object.keys(QUESTION_SETS) as QuoteJobType[]).map(
  (value) => ({
    value,
    label: JOB_TYPE_LABELS[value],
  }),
);

export type QuoteFieldName =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "jobType"
  | "details";

export type QuoteFieldErrors = Partial<Record<QuoteFieldName, string>>;

export type RawQuoteRequest = {
  name: string;
  company: string;
  email: string;
  phone: string;
  jobType: string;
  details: string;
  website: string;
  formStartedAt: string;
};

export type QuoteRequest = {
  name: string;
  company: string;
  email: string;
  phone: string;
  jobType: QuoteJobType;
  jobTypeLabel: string;
  details: string;
  questions: readonly string[];
  receivedAt: string;
};

export type QuoteSubmissionStatus =
  | "idle"
  | "submitting"
  | "success"
  | "validation_error"
  | "verification_error"
  | "delivery_error"
  | "configuration_error";

export type QuoteFormState = {
  status: QuoteSubmissionStatus;
  message: string;
  fieldErrors?: QuoteFieldErrors;
};

export const INITIAL_QUOTE_FORM_STATE: QuoteFormState = {
  status: "idle",
  message: "",
};

type QuoteValidationResult =
  | { success: true; data: QuoteRequest }
  | {
      success: false;
      fieldErrors: QuoteFieldErrors;
      formError?: string;
    };

type PublicFailureStatus =
  | "verification_error"
  | "delivery_error"
  | "configuration_error";

const PUBLIC_FAILURE_MESSAGES: Record<PublicFailureStatus, string> = {
  verification_error:
    "No pudimos completar la verificación de seguridad. Actualizá la verificación e intentá nuevamente.",
  delivery_error:
    "No pudimos enviar la solicitud en este momento. Tus datos siguen en el formulario para que puedas intentar nuevamente o contactarnos por WhatsApp.",
  configuration_error:
    "El envío por formulario no está disponible temporalmente. Tus datos siguen en pantalla y podés contactarnos por WhatsApp o email.",
};

export function normalizeSingleLine(value: string): string {
  return value
    .replace(/\p{Cf}/gu, "")
    .replace(/[\u0000-\u001f\u007f\s]+/g, " ")
    .trim();
}

export function normalizeMultiline(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/\p{Cf}/gu, "")
    .replace(/[\u0000\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .replace(/[\t ]+/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function isValidEmailAddress(value: string): boolean {
  if (value.length > QUOTE_FIELD_LIMITS.email.max || /[^\x21-\x7e]/.test(value)) {
    return false;
  }

  const parts = value.split("@");
  if (parts.length !== 2) return false;

  const [localPart, domain] = parts;
  if (
    !localPart ||
    !domain ||
    localPart.length > 64 ||
    localPart.startsWith(".") ||
    localPart.endsWith(".") ||
    localPart.includes("..") ||
    domain.includes("..") ||
    !/^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(localPart)
  ) {
    return false;
  }

  const domainLabels = domain.split(".");
  return (
    domainLabels.length >= 2 &&
    domainLabels.every(
      (label) =>
        label.length >= 1 &&
        label.length <= 63 &&
        /^[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?$/i.test(label),
    )
  );
}

export function isQuoteJobType(value: string): value is QuoteJobType {
  return Object.prototype.hasOwnProperty.call(QUESTION_SETS, value);
}

export function validateQuoteRequest(
  raw: RawQuoteRequest,
  now = Date.now(),
): QuoteValidationResult {
  const honeypot = normalizeSingleLine(raw.website);
  if (honeypot) {
    return {
      success: false,
      fieldErrors: {},
      formError: "No pudimos validar el envío. Revisá los datos e intentá nuevamente.",
    };
  }

  const formStartedAt = Number(raw.formStartedAt);
  if (
    !Number.isFinite(formStartedAt) ||
    formStartedAt <= 0 ||
    now - formStartedAt < MIN_QUOTE_SUBMISSION_MS
  ) {
    return {
      success: false,
      fieldErrors: {},
      formError:
        "Esperá un momento antes de enviar. Si el problema continúa, recargá la página e intentá nuevamente.",
    };
  }

  const name = normalizeSingleLine(raw.name);
  const company = normalizeSingleLine(raw.company);
  const email = normalizeSingleLine(raw.email).toLowerCase();
  const phone = normalizeSingleLine(raw.phone);
  const jobType = normalizeSingleLine(raw.jobType);
  const details = normalizeMultiline(raw.details);
  const fieldErrors: QuoteFieldErrors = {};

  if (!name) {
    fieldErrors.name = "Ingresá tu nombre.";
  } else if (name.length < QUOTE_FIELD_LIMITS.name.min) {
    fieldErrors.name = `El nombre debe tener al menos ${QUOTE_FIELD_LIMITS.name.min} caracteres.`;
  } else if (name.length > QUOTE_FIELD_LIMITS.name.max) {
    fieldErrors.name = `El nombre no puede superar ${QUOTE_FIELD_LIMITS.name.max} caracteres.`;
  }

  if (company.length > QUOTE_FIELD_LIMITS.company.max) {
    fieldErrors.company = `La empresa no puede superar ${QUOTE_FIELD_LIMITS.company.max} caracteres.`;
  }

  if (!email) {
    fieldErrors.email = "Ingresá tu email.";
  } else if (email.length > QUOTE_FIELD_LIMITS.email.max) {
    fieldErrors.email = `El email no puede superar ${QUOTE_FIELD_LIMITS.email.max} caracteres.`;
  } else if (!isValidEmailAddress(email)) {
    fieldErrors.email = "Ingresá un email válido, por ejemplo nombre@empresa.com.";
  }

  if (!phone) {
    fieldErrors.phone = "Ingresá un teléfono o número de WhatsApp.";
  } else if (phone.length < QUOTE_FIELD_LIMITS.phone.min) {
    fieldErrors.phone = `El teléfono debe tener al menos ${QUOTE_FIELD_LIMITS.phone.min} caracteres.`;
  } else if (phone.length > QUOTE_FIELD_LIMITS.phone.max) {
    fieldErrors.phone = `El teléfono no puede superar ${QUOTE_FIELD_LIMITS.phone.max} caracteres.`;
  } else if ((phone.match(/\d/g) ?? []).length < QUOTE_FIELD_LIMITS.phone.min) {
    fieldErrors.phone = `El teléfono debe incluir al menos ${QUOTE_FIELD_LIMITS.phone.min} dígitos.`;
  }

  if (!jobType) {
    fieldErrors.jobType = "Elegí el tipo de trabajo.";
  } else if (!isQuoteJobType(jobType)) {
    fieldErrors.jobType = "Elegí un tipo de trabajo válido.";
  }

  if (!details) {
    fieldErrors.details = "Contanos los detalles del trabajo.";
  } else if (details.length < QUOTE_FIELD_LIMITS.details.min) {
    fieldErrors.details = `Los detalles deben tener al menos ${QUOTE_FIELD_LIMITS.details.min} caracteres.`;
  } else if (details.length > QUOTE_FIELD_LIMITS.details.max) {
    fieldErrors.details = `Los detalles no pueden superar ${QUOTE_FIELD_LIMITS.details.max} caracteres.`;
  }

  if (Object.keys(fieldErrors).length > 0 || !isQuoteJobType(jobType)) {
    return {
      success: false,
      fieldErrors,
      formError: "Revisá los campos indicados antes de enviar.",
    };
  }

  return {
    success: true,
    data: {
      name,
      company,
      email,
      phone,
      jobType,
      jobTypeLabel: JOB_TYPE_LABELS[jobType],
      details,
      questions: [...QUESTION_SETS[jobType]],
      receivedAt: new Date(now).toISOString(),
    },
  };
}

export function toPublicQuoteFailure(
  status: PublicFailureStatus,
  internalError?: unknown,
): QuoteFormState {
  void internalError;

  return {
    status,
    message: PUBLIC_FAILURE_MESSAGES[status],
  };
}
