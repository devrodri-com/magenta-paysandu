"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TURNSTILE_ACTION } from "@/lib/turnstile";

const SCRIPT_ID = "cf-turnstile-api";

/** Debe coincidir con la propiedad declarada en `Window`, más abajo. */
const READY_CALLBACK = "__magentaTurnstileReady";

const SCRIPT_SRC = `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=${READY_CALLBACK}`;

/** Ancho mínimo que Cloudflare exige para el tamaño `flexible`. */
const FLEXIBLE_MIN_WIDTH = 300;

/** Evita que el aviso de carga parpadee cuando el token llega enseguida. */
const LOADING_MESSAGE_DELAY_MS = 700;

export const TURNSTILE_STATUS_ID = "turnstile-status";

export type TurnstileStatus = "loading" | "solved" | "expired" | "error";

type TurnstileSize = "flexible" | "compact";

type TurnstileRenderOptions = {
  sitekey: string;
  action: string;
  theme: "dark";
  language: string;
  appearance: "interaction-only";
  execution: "render";
  size: TurnstileSize;
  "response-field": boolean;
  "refresh-expired": "auto";
  "refresh-timeout": "auto";
  callback: (token: string) => void;
  "error-callback": () => void;
  "expired-callback": () => void;
  "timeout-callback": () => void;
};

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: TurnstileRenderOptions,
  ) => string | undefined;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    __magentaTurnstileReady?: () => void;
  }
}

let apiPromise: Promise<TurnstileApi> | null = null;

/**
 * Carga el script oficial una sola vez con renderizado explícito. Cloudflare
 * avisa por el callback declarado en `onload`, que es el momento en que
 * `window.turnstile` ya existe.
 */
function loadTurnstileApi(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (apiPromise) return apiPromise;

  const pending = new Promise<TurnstileApi>((resolve, reject) => {
    window[READY_CALLBACK] = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error("turnstile-unavailable"));
    };

    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("error", () => {
      reject(new Error("turnstile-script-error"));
    });

    document.head.append(script);
  });

  apiPromise = pending.catch((error: unknown) => {
    // Permitir un reintento limpio si el script nunca llegó a cargar.
    apiPromise = null;
    throw error;
  });

  return apiPromise;
}

/**
 * Instancia concreta del widget. Se monta con una `key` derivada del tamaño y
 * del contador de reinicios, así que cambiar cualquiera de los dos la reemplaza
 * por completo: no hay widgets duplicados ni tokens viejos colgados.
 */
function TurnstileInstance({
  siteKey,
  size,
  onTokenChange,
  onStatusChange,
}: {
  siteKey: string;
  size: TurnstileSize;
  onTokenChange: (token: string) => void;
  onStatusChange: (status: TurnstileStatus) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const onStatusChangeRef = useRef(onStatusChange);
  const [status, setStatus] = useState<TurnstileStatus>("loading");
  const [challengeVisible, setChallengeVisible] = useState(false);
  const [loadingHintVisible, setLoadingHintVisible] = useState(false);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
    onStatusChangeRef.current = onStatusChange;
  });

  /** Sólo lo invocan los callbacks de Cloudflare, nunca el cuerpo de un efecto. */
  const report = useCallback((next: TurnstileStatus, token: string) => {
    setStatus(next);
    setLoadingHintVisible(false);
    onStatusChangeRef.current(next);
    onTokenChangeRef.current(token);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let widgetId: string | undefined;

    loadTurnstileApi()
      .then((api) => {
        if (cancelled) return;

        widgetId = api.render(container, {
          sitekey: siteKey,
          action: TURNSTILE_ACTION,
          theme: "dark",
          language: "es",
          appearance: "interaction-only",
          execution: "render",
          size,
          // Un único input, controlado por React, transporta el token.
          "response-field": false,
          "refresh-expired": "auto",
          "refresh-timeout": "auto",
          callback: (token) => report("solved", token),
          "error-callback": () => report("error", ""),
          "expired-callback": () => report("expired", ""),
          "timeout-callback": () => report("expired", ""),
        });

        if (!widgetId) report("error", "");
      })
      .catch(() => {
        if (!cancelled) report("error", "");
      });

    return () => {
      cancelled = true;
      if (widgetId) window.turnstile?.remove(widgetId);
    };
  }, [report, siteKey, size]);

  /**
   * `interaction-only` deja el desafío oculto casi siempre: el contenedor mide
   * cero y no debe reservar espacio. El separador aparece sólo si Cloudflare
   * llega a mostrar algo.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setChallengeVisible(entry.contentRect.height > 0);
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (status !== "loading") return;

    const timer = window.setTimeout(
      () => setLoadingHintVisible(true),
      LOADING_MESSAGE_DELAY_MS,
    );

    return () => window.clearTimeout(timer);
  }, [status]);

  let message = "";
  if (status === "error") {
    message = "No pudimos completar la verificación de seguridad.";
  } else if (status === "expired") {
    message = "Verificación vencida. Intentá nuevamente.";
  } else if (status === "loading" && loadingHintVisible) {
    message = "Preparando verificación…";
  }

  return (
    <>
      <div
        ref={containerRef}
        data-turnstile-size={size}
        data-turnstile-status={status}
        className={`w-full max-w-full ${challengeVisible ? "mb-4" : ""}`}
      />
      <div aria-live="polite" aria-atomic="true">
        <p
          id={TURNSTILE_STATUS_ID}
          className={message ? "mb-4 text-xs text-slate-300" : "sr-only"}
        >
          {message}
        </p>
      </div>
    </>
  );
}

/**
 * Widget de Turnstile integrado al formulario oscuro de `/presupuesto`.
 *
 * Mide el contenedor —cuyo ancho decide el formulario, nunca el propio widget—
 * para elegir entre `flexible` (≥300px) y `compact`. El token no se muestra ni
 * se registra: sólo viaja por el input oculto que administra `QuoteForm`.
 */
export function TurnstileWidget({
  siteKey,
  resetKey,
  onTokenChange,
  onStatusChange,
}: {
  siteKey: string;
  resetKey: number;
  onTokenChange: (token: string) => void;
  onStatusChange: (status: TurnstileStatus) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<TurnstileSize | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      if (width > 0) {
        setSize(width >= FLEXIBLE_MIN_WIDTH ? "flexible" : "compact");
      }
    });

    observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="w-full">
      {size ? (
        <TurnstileInstance
          key={`${size}:${resetKey}`}
          siteKey={siteKey}
          size={size}
          onTokenChange={onTokenChange}
          onStatusChange={onStatusChange}
        />
      ) : null}
    </div>
  );
}
