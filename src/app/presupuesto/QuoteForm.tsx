"use client";

import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
  startTransition,
  type FormEvent,
} from "react";
import { QUESTION_SETS } from "@/data/questionSets";
import { WHATSAPP_URL_TEXT } from "@/data/contact";
import {
  INITIAL_QUOTE_FORM_STATE,
  QUOTE_FIELD_LIMITS,
  toPublicQuoteFailure,
  type QuoteFieldErrors,
  type QuoteFieldName,
  type QuoteJobType,
  type QuoteSubmissionStatus,
} from "@/lib/quote-request";
import { TURNSTILE_TOKEN_FIELD } from "@/lib/turnstile";
import { JobTypeSelect } from "./JobTypeSelect";
import {
  TurnstileWidget,
  TURNSTILE_STATUS_ID,
  type TurnstileStatus,
} from "./TurnstileWidget";
import { submitQuoteRequest } from "./actions";

/** Sin Sitekey no hay verificación posible: el formulario no puede enviar. */
const MISSING_SITE_KEY_STATE = toPublicQuoteFailure("configuration_error");

const controlClassName =
  "mt-1 w-full rounded-lg border border-slate-400 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-400 focus-visible:border-brand-rosaClaro focus-visible:ring-2 focus-visible:ring-brand-rosaClaro focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 disabled:cursor-wait disabled:opacity-70";

const FIELD_LABELS: Record<QuoteFieldName, string> = {
  name: "Nombre",
  company: "Empresa o comercio",
  email: "Email",
  phone: "Teléfono o WhatsApp",
  jobType: "Tipo de trabajo",
  details: "Detalles del pedido",
};

type QuoteFormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  jobType: QuoteJobType | "";
  details: string;
};

const EMPTY_FORM_VALUES: QuoteFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  jobType: "",
  details: "",
};

function describedBy(...ids: Array<string | false | undefined>): string | undefined {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true" className="text-brand-rosaClaro">
        {" "}*
      </span>
      <span className="sr-only"> (obligatorio)</span>
    </>
  );
}

function FieldError({
  field,
  errors,
}: {
  field: QuoteFieldName;
  errors?: QuoteFieldErrors;
}) {
  const message = errors?.[field];
  if (!message) return null;

  return (
    <p id={`${field}-error`} className="mt-1.5 text-sm font-medium text-rose-200">
      {message}
    </p>
  );
}

function FormStatus({
  status,
  message,
  fieldErrors,
}: {
  status: QuoteSubmissionStatus;
  message: string;
  fieldErrors?: QuoteFieldErrors;
}) {
  const errorEntries = Object.entries(fieldErrors ?? {}) as Array<
    [QuoteFieldName, string]
  >;
  const isError = status.endsWith("_error");

  if (status === "idle") return null;

  return (
    <div
      data-status={status}
      role={isError ? "alert" : "status"}
      className={`mb-5 rounded-xl border p-4 text-sm ${
        isError
          ? "border-rose-300 bg-rose-950/50 text-rose-100"
          : "border-emerald-300 bg-emerald-950/40 text-emerald-50"
      }`}
    >
      <p className="font-semibold">{message}</p>
      {status === "validation_error" && errorEntries.length > 0 ? (
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {errorEntries.map(([field, error]) => (
            <li key={field}>
              <a
                href={`#${field}`}
                className="underline decoration-2 underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-rosaClaro"
              >
                {FIELD_LABELS[field]}: {error}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      {status === "success" ? (
        <a
          href={WHATSAPP_URL_TEXT}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex rounded-full border border-emerald-200 px-4 py-2 font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-rosaClaro"
        >
          Continuar por WhatsApp
        </a>
      ) : null}
    </div>
  );
}

export function QuoteForm({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const [values, setValues] = useState<QuoteFormValues>(EMPTY_FORM_VALUES);
  const [responseDismissed, setResponseDismissed] = useState(false);
  const [dismissedErrorFields, setDismissedErrorFields] = useState<
    QuoteFieldName[]
  >([]);
  const [formStartedAt, setFormStartedAt] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileStatus, setTurnstileStatus] =
    useState<TurnstileStatus>("loading");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const submissionInFlightRef = useRef(false);
  const siteKey = turnstileSiteKey.trim();
  const submitAndHandleSuccess = useCallback(
    async (previousState: typeof INITIAL_QUOTE_FORM_STATE, formData: FormData) => {
      try {
        const nextState = await submitQuoteRequest(previousState, formData);

        if (nextState.status === "success") {
          setValues({ ...EMPTY_FORM_VALUES });
          setFormStartedAt(String(Date.now()));
        }

        return nextState;
      } catch (error) {
        return toPublicQuoteFailure("delivery_error", error);
      } finally {
        submissionInFlightRef.current = false;
        // El token es de un solo uso: se descarta siempre y se pide otro,
        // tanto tras un éxito como tras cualquier error recuperable. Cambiar
        // la clave vuelve a montar el widget, que emitirá un token nuevo.
        setTurnstileToken("");
        setTurnstileStatus("loading");
        setTurnstileResetKey((current) => current + 1);
      }
    },
    [],
  );
  const [state, formAction, pending] = useActionState(
    submitAndHandleSuccess,
    INITIAL_QUOTE_FORM_STATE,
  );
  const questions = values.jobType ? QUESTION_SETS[values.jobType] : null;
  const activeFieldErrors = Object.fromEntries(
    Object.entries(state.fieldErrors ?? {}).filter(
      ([field]) => !dismissedErrorFields.includes(field as QuoteFieldName),
    ),
  ) as QuoteFieldErrors;
  const hadFieldErrors = Object.keys(state.fieldErrors ?? {}).length > 0;
  const hasActiveFieldErrors = Object.keys(activeFieldErrors).length > 0;
  const allValidationErrorsDismissed =
    state.status === "validation_error" &&
    hadFieldErrors &&
    !hasActiveFieldErrors;
  const displayedState =
    responseDismissed || allValidationErrorsDismissed
      ? INITIAL_QUOTE_FORM_STATE
      : { ...state, fieldErrors: activeFieldErrors };
  const fieldErrors = pending ? undefined : displayedState.fieldErrors;
  const turnstileConfigured = siteKey.length > 0;
  let visibleStatus: QuoteSubmissionStatus;
  let visibleMessage: string;

  if (!turnstileConfigured) {
    visibleStatus = MISSING_SITE_KEY_STATE.status;
    visibleMessage = MISSING_SITE_KEY_STATE.message;
  } else if (pending) {
    visibleStatus = "submitting";
    visibleMessage = "Enviando…";
  } else {
    visibleStatus = displayedState.status;
    visibleMessage = displayedState.message;
  }

  const canSubmit =
    turnstileConfigured &&
    Boolean(formStartedAt) &&
    !pending &&
    turnstileStatus === "solved" &&
    turnstileToken.length > 0;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFormStartedAt(String(Date.now()));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function updateValue<Key extends keyof QuoteFormValues>(
    field: Key,
    value: QuoteFormValues[Key],
  ): void {
    setValues((current) => ({ ...current, [field]: value }));

    if (state.status === "validation_error") {
      if (state.fieldErrors?.[field]) {
        setDismissedErrorFields((current) =>
          current.includes(field) ? current : [...current, field],
        );
      } else if (Object.keys(state.fieldErrors ?? {}).length === 0) {
        setResponseDismissed(true);
      }
    } else if (state.status !== "idle") {
      setResponseDismissed(true);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (submissionInFlightRef.current || !canSubmit) return;
    submissionInFlightRef.current = true;
    setResponseDismissed(false);
    setDismissedErrorFields([]);

    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={pending}
    >
      <div aria-live="polite" aria-atomic="true">
        <FormStatus
          status={visibleStatus}
          message={visibleMessage}
          fieldErrors={fieldErrors}
        />
      </div>

      <fieldset disabled={pending} className="space-y-5 border-0 p-0">
        <legend className="sr-only">Información para pedir presupuesto</legend>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-100">
            Nombre
            <RequiredMark />
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={QUOTE_FIELD_LIMITS.name.min}
            maxLength={QUOTE_FIELD_LIMITS.name.max}
            value={values.name}
            onChange={(event) => updateValue("name", event.target.value)}
            aria-invalid={Boolean(fieldErrors?.name)}
            aria-describedby={describedBy(fieldErrors?.name && "name-error")}
            className={controlClassName}
            placeholder="Tu nombre"
          />
          <FieldError field="name" errors={fieldErrors} />
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-slate-100"
          >
            Empresa o comercio <span className="text-slate-300">(opcional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={QUOTE_FIELD_LIMITS.company.max}
            value={values.company}
            onChange={(event) => updateValue("company", event.target.value)}
            aria-invalid={Boolean(fieldErrors?.company)}
            aria-describedby={describedBy(
              fieldErrors?.company && "company-error",
            )}
            className={controlClassName}
            placeholder="Nombre de tu negocio"
          />
          <FieldError field="company" errors={fieldErrors} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-100">
            Email
            <RequiredMark />
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={QUOTE_FIELD_LIMITS.email.max}
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
            aria-invalid={Boolean(fieldErrors?.email)}
            aria-describedby={describedBy(fieldErrors?.email && "email-error")}
            className={controlClassName}
            placeholder="tucorreo@ejemplo.com"
          />
          <FieldError field="email" errors={fieldErrors} />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-100">
            Teléfono o WhatsApp
            <RequiredMark />
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            minLength={QUOTE_FIELD_LIMITS.phone.min}
            maxLength={QUOTE_FIELD_LIMITS.phone.max}
            value={values.phone}
            onChange={(event) => updateValue("phone", event.target.value)}
            aria-invalid={Boolean(fieldErrors?.phone)}
            aria-describedby={describedBy(
              "phone-hint",
              fieldErrors?.phone && "phone-error",
            )}
            className={controlClassName}
            placeholder="Ej.: 098 123 456"
          />
          <p id="phone-hint" className="mt-1.5 text-xs text-slate-300">
            Incluí el código de país si nos escribís desde fuera de Uruguay.
          </p>
          <FieldError field="phone" errors={fieldErrors} />
        </div>
      </div>

      <div>
        <label htmlFor="jobType" className="block text-sm font-medium text-slate-100">
          Tipo de trabajo
          <RequiredMark />
        </label>
        <JobTypeSelect
          value={values.jobType}
          onChange={(next) => updateValue("jobType", next)}
          disabled={pending}
          invalid={Boolean(fieldErrors?.jobType)}
          describedBy={describedBy(
            "jobType-hint",
            fieldErrors?.jobType && "jobType-error",
          )}
        />
        <p id="jobType-hint" className="mt-1.5 text-xs text-slate-300">
          La selección determina las preguntas que aparecen a continuación.
        </p>
        <FieldError field="jobType" errors={fieldErrors} />

        <div aria-live="polite" aria-atomic="true" className="mt-4">
          {questions ? (
            <div className="rounded-2xl border border-slate-600 bg-slate-900/70 p-4 text-sm text-slate-200">
              <p className="font-semibold text-white">
                Para este tipo de trabajo, contanos:
              </p>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                {questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ol>
              <p className="mt-3 text-xs text-slate-300">
                Respondé estas preguntas en el campo de detalles.
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="details" className="block text-sm font-medium text-slate-100">
          Detalles del pedido
          <RequiredMark />
        </label>
        <textarea
          id="details"
          name="details"
          rows={7}
          autoComplete="off"
          required
          minLength={QUOTE_FIELD_LIMITS.details.min}
          maxLength={QUOTE_FIELD_LIMITS.details.max}
          value={values.details}
          onChange={(event) => updateValue("details", event.target.value)}
          aria-invalid={Boolean(fieldErrors?.details)}
          aria-describedby={describedBy(
            "details-hint",
            fieldErrors?.details && "details-error",
          )}
          className={controlClassName}
          placeholder="Indicá cantidad, medidas, papel, tintas, terminaciones, si ya tenés diseño y cualquier otro detalle relevante."
        />
        <p id="details-hint" className="mt-1.5 text-xs text-slate-300">
          Máximo {QUOTE_FIELD_LIMITS.details.max} caracteres.
        </p>
        <FieldError field="details" errors={fieldErrors} />
      </div>

      <div
        aria-hidden="true"
        className="absolute -left-[10000px] h-px w-px overflow-hidden"
      >
        <label htmlFor="website">No completar este campo</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <input
        type="hidden"
        id="formStartedAt"
        name="formStartedAt"
        value={formStartedAt}
        readOnly
      />

      <div>
        {turnstileConfigured ? (
          <>
            <TurnstileWidget
              siteKey={siteKey}
              resetKey={turnstileResetKey}
              onTokenChange={setTurnstileToken}
              onStatusChange={setTurnstileStatus}
            />
            <input
              type="hidden"
              name={TURNSTILE_TOKEN_FIELD}
              value={turnstileToken}
              readOnly
            />
          </>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit}
          aria-describedby={turnstileConfigured ? TURNSTILE_STATUS_ID : undefined}
          className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-brand-magenta px-7 text-sm font-semibold text-white transition hover:bg-[#c3006b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-rosaClaro focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Enviando…" : "Enviar consulta"}
        </button>
      </div>
      </fieldset>
    </form>
  );
}
