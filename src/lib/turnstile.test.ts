import { afterEach, describe, expect, it, vi } from "vitest";
import {
  TURNSTILE_ACTION,
  TURNSTILE_MAX_TOKEN_LENGTH,
  TURNSTILE_PRODUCTION_HOSTNAMES,
  resolveTurnstileAllowedHostnames,
  verifyTurnstileToken,
} from "./turnstile";

const SECRET = "secreto-de-prueba";
const TOKEN = "token-de-prueba";
const HOSTNAME = TURNSTILE_PRODUCTION_HOSTNAMES[0];

const SITEVERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function successPayload(overrides: Record<string, unknown> = {}) {
  return {
    success: true,
    action: TURNSTILE_ACTION,
    hostname: HOSTNAME,
    challenge_ts: "2026-08-12T10:00:00.000Z",
    ...overrides,
  };
}

function stubFetch(payload: unknown, ok = true) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok,
    json: async () => payload,
  });

  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function stubFailingFetch(error: unknown) {
  const fetchMock = vi.fn().mockRejectedValue(error);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function requestBody(fetchMock: ReturnType<typeof vi.fn>): URLSearchParams {
  return fetchMock.mock.calls[0][1].body as URLSearchParams;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("verifyTurnstileToken · contrato de la llamada", () => {
  it("verifica un token válido y arma la petición esperada", async () => {
    const fetchMock = stubFetch(successPayload());

    const outcome = await verifyTurnstileToken({ token: TOKEN, secret: SECRET });

    expect(outcome).toBe("verified");
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(SITEVERIFY_ENDPOINT);
    expect(init.method).toBe("POST");
    expect(init.cache).toBe("no-store");
    expect(init.signal).toBeInstanceOf(AbortSignal);

    const body = requestBody(fetchMock);
    expect(body.get("secret")).toBe(SECRET);
    expect(body.get("response")).toBe(TOKEN);
    expect(body.has("remoteip")).toBe(false);
  });

  it("incluye remoteip sólo cuando se provee", async () => {
    const fetchMock = stubFetch(successPayload());

    await verifyTurnstileToken({
      token: TOKEN,
      secret: SECRET,
      remoteIp: "203.0.113.7",
    });

    expect(requestBody(fetchMock).get("remoteip")).toBe("203.0.113.7");
  });

  it("recorta el secreto antes de enviarlo", async () => {
    const fetchMock = stubFetch(successPayload());

    await verifyTurnstileToken({ token: TOKEN, secret: `  ${SECRET}  ` });

    expect(requestBody(fetchMock).get("secret")).toBe(SECRET);
  });
});

describe("verifyTurnstileToken · validación previa del token", () => {
  it("rechaza un token ausente sin llamar a Cloudflare", async () => {
    const fetchMock = stubFetch(successPayload());

    expect(await verifyTurnstileToken({ token: "", secret: SECRET })).toBe(
      "missing_token",
    );
    expect(await verifyTurnstileToken({ token: "   ", secret: SECRET })).toBe(
      "missing_token",
    );
    expect(await verifyTurnstileToken({ token: null, secret: SECRET })).toBe(
      "missing_token",
    );
    expect(
      await verifyTurnstileToken({ token: undefined, secret: SECRET }),
    ).toBe("missing_token");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rechaza un token que no es string", async () => {
    const fetchMock = stubFetch(successPayload());

    expect(await verifyTurnstileToken({ token: 12345, secret: SECRET })).toBe(
      "missing_token",
    );
    expect(
      await verifyTurnstileToken({ token: new Blob(["x"]), secret: SECRET }),
    ).toBe("missing_token");
    expect(
      await verifyTurnstileToken({ token: { response: TOKEN }, secret: SECRET }),
    ).toBe("missing_token");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it(`rechaza un token de más de ${TURNSTILE_MAX_TOKEN_LENGTH} caracteres`, async () => {
    const fetchMock = stubFetch(successPayload());

    const outcome = await verifyTurnstileToken({
      token: "a".repeat(TURNSTILE_MAX_TOKEN_LENGTH + 1),
      secret: SECRET,
    });

    expect(outcome).toBe("invalid_token");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("acepta un token exactamente en el límite", async () => {
    stubFetch(successPayload());

    const outcome = await verifyTurnstileToken({
      token: "a".repeat(TURNSTILE_MAX_TOKEN_LENGTH),
      secret: SECRET,
    });

    expect(outcome).toBe("verified");
  });

  it("no llama a Cloudflare si falta el secret", async () => {
    const fetchMock = stubFetch(successPayload());

    expect(await verifyTurnstileToken({ token: TOKEN, secret: "" })).toBe(
      "not_configured",
    );
    expect(await verifyTurnstileToken({ token: TOKEN, secret: "   " })).toBe(
      "not_configured",
    );
    expect(
      await verifyTurnstileToken({ token: TOKEN, secret: undefined }),
    ).toBe("not_configured");
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("verifyTurnstileToken · respuesta de Siteverify", () => {
  it("rechaza success=false", async () => {
    stubFetch(successPayload({ success: false }));

    expect(await verifyTurnstileToken({ token: TOKEN, secret: SECRET })).toBe(
      "invalid_token",
    );
  });

  it.each([
    "invalid-input-response",
    "timeout-or-duplicate",
    "bad-request",
  ])("rechaza el error-code %s", async (errorCode) => {
    stubFetch({ success: false, "error-codes": [errorCode] });

    expect(await verifyTurnstileToken({ token: TOKEN, secret: SECRET })).toBe(
      "invalid_token",
    );
  });

  it.each(["otro_form", "test", "", "quote_form ", "QUOTE_FORM"])(
    "rechaza la action %s",
    async (action) => {
      stubFetch(successPayload({ action }));

      expect(await verifyTurnstileToken({ token: TOKEN, secret: SECRET })).toBe(
        "invalid_token",
      );
    },
  );

  it("falla cerrado ante la metadata de las claves dummy de Cloudflare", async () => {
    // Respuesta real de Siteverify para un token dummy: sin `action` y con
    // hostname `example.com`. No debe relajarse la validación productiva.
    stubFetch({
      success: true,
      "error-codes": [],
      hostname: "example.com",
      metadata: { result_with_testing_key: true },
    });

    expect(await verifyTurnstileToken({ token: TOKEN, secret: SECRET })).toBe(
      "invalid_token",
    );
  });

  it("rechaza una action ausente o no string", async () => {
    stubFetch(successPayload({ action: undefined }));
    expect(await verifyTurnstileToken({ token: TOKEN, secret: SECRET })).toBe(
      "invalid_token",
    );

    stubFetch(successPayload({ action: 7 }));
    expect(await verifyTurnstileToken({ token: TOKEN, secret: SECRET })).toBe(
      "invalid_token",
    );
  });

  it.each(TURNSTILE_PRODUCTION_HOSTNAMES)(
    "acepta el hostname permitido %s",
    async (hostname) => {
      stubFetch(successPayload({ hostname }));

      expect(await verifyTurnstileToken({ token: TOKEN, secret: SECRET })).toBe(
        "verified",
      );
    },
  );

  it.each([
    "magenta-paysandu-m5in.vercel.app",
    "evil.example",
    "magentauruguay.com.evil.example",
    "localhost",
  ])("rechaza el hostname no permitido %s", async (hostname) => {
    stubFetch(successPayload({ hostname }));

    expect(await verifyTurnstileToken({ token: TOKEN, secret: SECRET })).toBe(
      "invalid_token",
    );
  });

  it("rechaza un hostname ausente o no string", async () => {
    stubFetch(successPayload({ hostname: undefined }));
    expect(await verifyTurnstileToken({ token: TOKEN, secret: SECRET })).toBe(
      "invalid_token",
    );

    stubFetch(successPayload({ hostname: ["magentauruguay.com"] }));
    expect(await verifyTurnstileToken({ token: TOKEN, secret: SECRET })).toBe(
      "invalid_token",
    );
  });

  it.each([null, "no-json", 42])(
    "trata una respuesta JSON no objeto (%s) como no disponible",
    async (payload) => {
      stubFetch(payload);

      expect(await verifyTurnstileToken({ token: TOKEN, secret: SECRET })).toBe(
        "unavailable",
      );
    },
  );
});

describe("verifyTurnstileToken · falla cerrado", () => {
  it("devuelve unavailable ante un timeout de red", async () => {
    stubFailingFetch(
      new DOMException("The operation was aborted.", "TimeoutError"),
    );

    expect(
      await verifyTurnstileToken({ token: TOKEN, secret: SECRET, timeoutMs: 5 }),
    ).toBe("unavailable");
  });

  it("devuelve unavailable ante un fallo de red", async () => {
    stubFailingFetch(new TypeError("fetch failed"));

    expect(await verifyTurnstileToken({ token: TOKEN, secret: SECRET })).toBe(
      "unavailable",
    );
  });

  it("devuelve unavailable ante un HTTP no OK", async () => {
    stubFetch(successPayload(), false);

    expect(await verifyTurnstileToken({ token: TOKEN, secret: SECRET })).toBe(
      "unavailable",
    );
  });

  it("devuelve unavailable si el cuerpo no es JSON", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => {
        throw new SyntaxError("Unexpected token < in JSON");
      },
    });
    vi.stubGlobal("fetch", fetchMock);

    expect(await verifyTurnstileToken({ token: TOKEN, secret: SECRET })).toBe(
      "unavailable",
    );
  });
});

describe("resolveTurnstileAllowedHostnames", () => {
  it("no incluye localhost por defecto", () => {
    expect(resolveTurnstileAllowedHostnames({})).toEqual([
      ...TURNSTILE_PRODUCTION_HOSTNAMES,
    ]);
  });

  it.each(["false", "1", "yes", "", undefined])(
    "no habilita localhost con TURNSTILE_ALLOW_LOCALHOST=%s",
    (value) => {
      const hostnames = resolveTurnstileAllowedHostnames({
        TURNSTILE_ALLOW_LOCALHOST: value,
      });

      expect(hostnames).not.toContain("localhost");
      expect(hostnames).not.toContain("127.0.0.1");
    },
  );

  it("habilita localhost sólo con la activación explícita de testing", () => {
    const hostnames = resolveTurnstileAllowedHostnames({
      TURNSTILE_ALLOW_LOCALHOST: "true",
    });

    expect(hostnames).toContain("localhost");
    expect(hostnames).toContain("127.0.0.1");
    expect(hostnames).toEqual(
      expect.arrayContaining([...TURNSTILE_PRODUCTION_HOSTNAMES]),
    );
  });

  it("no deriva la lista de NODE_ENV", () => {
    vi.stubEnv("NODE_ENV", "development");

    expect(resolveTurnstileAllowedHostnames(process.env)).not.toContain(
      "localhost",
    );
  });

  it("acepta localhost cuando la lista ampliada se pasa explícitamente", async () => {
    stubFetch(successPayload({ hostname: "localhost" }));

    const outcome = await verifyTurnstileToken({
      token: TOKEN,
      secret: SECRET,
      allowedHostnames: resolveTurnstileAllowedHostnames({
        TURNSTILE_ALLOW_LOCALHOST: "true",
      }),
    });

    expect(outcome).toBe("verified");
  });
});
