"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { WHATSAPP_URL } from "@/data/contact";

const MOBILE_MENU_ID = "navbar-mobile-menu";

/** Fuente única de la navegación: se reutiliza en desktop y en el panel mobile. */
const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-nosotros", label: "Nosotros" },
  { href: "/productos", label: "Productos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
];

const SOCIAL_LINKS = [
  { href: WHATSAPP_URL, label: "WhatsApp", Icon: FaWhatsapp },
  { href: "https://instagram.com/magentapaysandu", label: "Instagram", Icon: FaInstagram },
  { href: "https://facebook.com/magentapaysandu", label: "Facebook", Icon: FaFacebook },
];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-white";

function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      {SOCIAL_LINKS.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-xl text-slate-600 hover:text-brand-magenta ${FOCUS_RING}`}
        >
          <Icon aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar al navegar (incluye back/forward, no sólo el click en el link).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  // Cerrar con Escape.
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  function navLinkClass(href: string) {
    const isActive = pathname === href;
    return `inline-flex min-h-[44px] items-center border-b-2 ${
      isActive
        ? "border-brand-magenta text-brand-magenta font-semibold"
        : "border-transparent text-slate-800 hover:text-brand-magenta hover:border-brand-magenta/70"
    } ${FOCUS_RING}`;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Imprenta Magenta - Inicio"
          className={`flex shrink-0 items-center rounded-md ${FOCUS_RING}`}
        >
          <Image
            src="/images/logo.svg"
            alt="Logo Imprenta Magenta"
            width={140}
            height={48}
            className="h-10 w-auto object-contain md:h-11 lg:h-12"
          />
        </Link>

        {/* Navegación desktop (>=768px) */}
        <div className="hidden items-center gap-4 md:flex lg:gap-6">
          <ul className="flex items-center gap-4 text-sm lg:gap-6 lg:text-base">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className={navLinkClass(href)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/presupuesto"
            aria-current={pathname === "/presupuesto" ? "page" : undefined}
            className={`inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full bg-brand-magenta px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-rosa ${FOCUS_RING}`}
          >
            Pedir presupuesto
          </Link>

          <SocialIcons className="hidden lg:flex" />
        </div>

        {/* Botón menú mobile (<768px) */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls={MOBILE_MENU_ID}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-800 hover:bg-slate-100 md:hidden ${FOCUS_RING}`}
        >
          {isOpen ? (
            <HiX className="h-6 w-6" aria-hidden="true" />
          ) : (
            <HiMenu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Panel mobile */}
      <div
        id={MOBILE_MENU_ID}
        hidden={!isOpen}
        className="border-t border-slate-200 bg-white md:hidden"
      >
        <div className="mx-auto flex max-w-6xl flex-col px-4 pb-4 text-base font-medium text-slate-800">
          <ul className="flex flex-col">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`${navLinkClass(href)} w-full`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/presupuesto"
            aria-current={pathname === "/presupuesto" ? "page" : undefined}
            onClick={() => setIsOpen(false)}
            className={`mt-3 inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand-magenta px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-rosa ${FOCUS_RING}`}
          >
            Pedir presupuesto
          </Link>

          <SocialIcons className="mt-2 gap-1" />
        </div>
      </div>
    </nav>
  );
}
