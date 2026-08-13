/**
 * Verificación de Cloudflare Turnstile.
 *
 * `verifyTurnstileToken` sólo puede ejecutarse en el servidor: recibe el secreto
 * por parámetro y habla directo con Siteverify. El módulo nunca lee ni escribe
 * `TURNSTILE_SECRET_KEY`, así que las constantes de contrato (nombre del campo y
 * `action`) pueden compartirse con el Client Component sin filtrar nada.
 *
 * Ante red caída, timeout, HTTP no OK o respuesta inesperada falla cerrado:
 * devuelve un resultado no verificado en vez de dejar pasar el envío.
 */

/** Nombre del único input que transporta el token hasta el Server Action. */
export const TURNSTILE_TOKEN_FIELD = "cf-turnstile-response";

/** `action` declarada al renderizar el widget y exigida en Siteverify. */
export const TURNSTILE_ACTION = "quote_form";

export const TURNSTILE_MAX_TOKEN_LENGTH = 2048;

export const TURNSTILE_TIMEOUT_MS = 9000;

const SITEVERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Hostnames que sirven el formulario productivo y de Preview canónico. */
export const TURNSTILE_PRODUCTION_HOSTNAMES = [
  "magentauruguay.com",
  "www.magentauruguay.com",
  "magenta-paysandu.vercel.app",
  "magenta-paysandu-git-refresh-magenta-2026-softbms-projects.vercel.app",
] as const;

/** Sólo se habilitan con `TURNSTILE_ALLOW_LOCALHOST=true`, nunca en producción. */
export const TURNSTILE_LOCAL_HOSTNAMES = ["localhost", "127.0.0.1"] as const;

export type TurnstileOutcome =
  | "verified"
  | "missing_token"
  | "invalid_token"
  | "unavailable"
  | "not_configured";

export type TurnstileVerificationOptions = {
  /** Valor crudo del FormData: puede no ser string. */
  token: unknown;
  secret: string | null | undefined;
  /**
   * Opcional y desactivado en el formulario de presupuesto: si la IP que ve el
   * hosting no coincide con la que vio Cloudflare (dual stack IPv4/IPv6),
   * Siteverify rechaza un token legítimo. Ver la documentación operativa.
   */
  remoteIp?: string | null;
  allowedHostnames?: readonly string[];
  timeoutMs?: number;
};

/**
 * Lista de hostnames aceptados. `localhost` y `127.0.0.1` requieren activación
 * explícita; nunca se derivan de `NODE_ENV` ni se amplían en silencio.
 */
export function resolveTurnstileAllowedHostnames(
  env: Record<string, string | undefined> = process.env,
): readonly string[] {
  return env.TURNSTILE_ALLOW_LOCALHOST === "true"
    ? [...TURNSTILE_PRODUCTION_HOSTNAMES, ...TURNSTILE_LOCAL_HOSTNAMES]
    : TURNSTILE_PRODUCTION_HOSTNAMES;
}

function interpretSiteverify(
  payload: unknown,
  allowedHostnames: readonly string[],
): TurnstileOutcome {
  if (typeof payload !== "object" || payload === null) return "unavailable";

  const { success, action, hostname } = payload as Record<string, unknown>;

  if (success !== true) return "invalid_token";
  if (action !== TURNSTILE_ACTION) return "invalid_token";
  if (typeof hostname !== "string" || !allowedHostnames.includes(hostname)) {
    return "invalid_token";
  }

  return "verified";
}

export async function verifyTurnstileToken({
  token,
  secret,
  remoteIp,
  allowedHostnames = resolveTurnstileAllowedHostnames(),
  timeoutMs = TURNSTILE_TIMEOUT_MS,
}: TurnstileVerificationOptions): Promise<TurnstileOutcome> {
  const trimmedSecret = typeof secret === "string" ? secret.trim() : "";
  if (!trimmedSecret) return "not_configured";

  if (typeof token !== "string" || token.trim() === "") return "missing_token";
  if (token.length > TURNSTILE_MAX_TOKEN_LENGTH) return "invalid_token";

  const body = new URLSearchParams({
    secret: trimmedSecret,
    response: token,
  });

  if (remoteIp) body.set("remoteip", remoteIp);

  let payload: unknown;

  try {
    const response = await fetch(SITEVERIFY_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!response.ok) return "unavailable";

    payload = await response.json();
  } catch {
    // Red, timeout o cuerpo ilegible: sin secreto, token ni IP en el log.
    return "unavailable";
  }

  return interpretSiteverify(payload, allowedHostnames);
}
