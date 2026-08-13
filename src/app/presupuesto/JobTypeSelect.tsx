"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { LuCheck, LuChevronDown } from "react-icons/lu";
import { JOB_TYPE_OPTIONS, type QuoteJobType } from "@/lib/quote-request";

const LISTBOX_ID = "jobType-listbox";
const optionId = (index: number) => `jobType-option-${index}`;

/**
 * Combobox de selección única (patrón ARIA 1.2 con `aria-activedescendant`):
 * el foco no sale nunca del trigger, así Tab sigue al control siguiente sin
 * necesidad de atraparlo ni de restaurarlo a mano.
 *
 * El resaltado se dibuja desde `activeIndex`, no desde `:hover`, para que en
 * touch no quede una fila pegada al último tap.
 */
export function JobTypeSelect({
  value,
  onChange,
  disabled = false,
  invalid = false,
  describedBy,
}: {
  value: QuoteJobType | "";
  onChange: (value: QuoteJobType) => void;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const selectedIndex = JOB_TYPE_OPTIONS.findIndex(
    (option) => option.value === value,
  );
  const selectedLabel =
    selectedIndex >= 0 ? JOB_TYPE_OPTIONS[selectedIndex].label : null;

  function openWith(index: number) {
    setActiveIndex(index);
    setOpen(true);
  }

  function close() {
    setOpen(false);
    setActiveIndex(-1);
  }

  function commit(index: number) {
    const option = JOB_TYPE_OPTIONS[index];
    if (!option) return;

    onChange(option.value);
    close();
    triggerRef.current?.focus();
  }

  // El submit deshabilita el fieldset: mientras tanto el popup queda cerrado
  // de forma derivada, sin necesidad de sincronizarlo con un efecto.
  const isOpen = open && !disabled;

  // Click fuera. Se escucha en `pointerdown` del documento, pero cualquier
  // pointerdown dentro del contenedor (incluidas las opciones) no cierra, así
  // el click de una opción siempre llega a procesarse.
  useEffect(() => {
    if (!isOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) close();
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  // La opción activa siempre visible dentro del scroll interno del popup.
  useEffect(() => {
    if (!isOpen || activeIndex < 0) return;

    listboxRef.current
      ?.querySelector(`#${optionId(activeIndex)}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeIndex]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const { key } = event;
    const last = JOB_TYPE_OPTIONS.length - 1;

    if (!isOpen) {
      if (key === "Enter" || key === " " || key === "Spacebar") {
        event.preventDefault();
        openWith(selectedIndex >= 0 ? selectedIndex : 0);
      } else if (key === "ArrowDown") {
        event.preventDefault();
        openWith(selectedIndex >= 0 ? selectedIndex : 0);
      } else if (key === "ArrowUp") {
        event.preventDefault();
        openWith(selectedIndex >= 0 ? selectedIndex : last);
      }
      return;
    }

    if (key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current >= last ? last : current + 1));
    } else if (key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current <= 0 ? 0 : current - 1));
    } else if (key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (key === "End") {
      event.preventDefault();
      setActiveIndex(last);
    } else if (key === "Enter" || key === " " || key === "Spacebar") {
      event.preventDefault();
      commit(activeIndex);
    } else if (key === "Escape") {
      event.preventDefault();
      close();
    } else if (key === "Tab") {
      // Sin preventDefault: el foco sigue al control siguiente.
      close();
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        id="jobType"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={LISTBOX_ID}
        aria-activedescendant={
          isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined
        }
        aria-invalid={invalid}
        aria-describedby={describedBy}
        disabled={disabled}
        onClick={() => {
          if (isOpen) close();
          else openWith(selectedIndex >= 0 ? selectedIndex : 0);
        }}
        onKeyDown={handleKeyDown}
        onBlur={close}
        className={`mt-1 flex min-h-[48px] w-full items-center justify-between gap-3 rounded-lg border bg-slate-900 px-3 py-2.5 text-left text-sm text-white outline-none transition focus-visible:border-brand-rosaClaro focus-visible:ring-2 focus-visible:ring-brand-rosaClaro focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 disabled:cursor-wait disabled:opacity-70 ${
          invalid ? "border-rose-300" : "border-slate-400"
        }`}
      >
        <span className={selectedLabel ? "text-white" : "text-slate-400"}>
          {selectedLabel ?? "Elegí una opción"}
        </span>
        <LuChevronDown
          aria-hidden="true"
          className={`size-4 shrink-0 text-slate-300 transition-transform motion-reduce:transition-none ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen ? (
        <ul
          ref={listboxRef}
          id={LISTBOX_ID}
          role="listbox"
          aria-label="Tipo de trabajo"
          // Mantiene el foco en el trigger al pulsar una opción, así el blur no
          // cierra el popup antes de que el click se procese.
          onMouseDown={(event) => event.preventDefault()}
          // `mt-1` deja el popup inmediatamente debajo del trigger y tapa por
          // completo el hint, que si no asoma por el hueco.
          className="absolute left-0 right-0 top-full z-30 mt-1 max-h-[min(320px,50vh)] overflow-y-auto overscroll-contain rounded-xl border border-slate-600 bg-slate-900 py-1.5 shadow-xl shadow-slate-950/50"
        >
          {JOB_TYPE_OPTIONS.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <li
                key={option.value}
                id={optionId(index)}
                role="option"
                aria-selected={isSelected}
                onClick={() => commit(index)}
                onMouseMove={() => setActiveIndex(index)}
                className={`flex min-h-[44px] cursor-pointer items-center justify-between gap-3 px-4 text-sm transition-colors motion-reduce:transition-none ${
                  isActive ? "bg-brand-rosaClaro/10" : ""
                } ${isSelected ? "font-medium text-white" : "text-slate-200"}`}
              >
                <span>{option.label}</span>
                {isSelected ? (
                  <LuCheck
                    aria-hidden="true"
                    className="size-4 shrink-0 text-brand-rosaClaro"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}

      <input type="hidden" name="jobType" value={value} />
    </div>
  );
}
