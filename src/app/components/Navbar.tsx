"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/servicios", label: "Servicios" },
    { href: "/productos", label: "Productos" },
    { href: "/portfolio", label: "Trabajos" },
  ];

  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Logo Imprenta Magenta"
            width={140}
            height={48}
            className="h-12 w-auto object-contain"
          />
        </a>

        {/* Links desktop */}
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-800 sm:flex">
          {/* Links */}
          <div className="flex items-center gap-8 text-base">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`pb-1 border-b-2 transition-colors ${
                    isActive
                      ? "border-brand-magenta text-brand-magenta font-semibold"
                      : "border-transparent text-slate-800 hover:text-brand-magenta hover:border-brand-magenta/70"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* CTA principal */}
          <a
            href="/presupuesto"
            className="rounded-full bg-brand-magenta px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-rosa transition"
          >
            Pedir presupuesto
          </a>

          {/* Iconos redes */}
          <div className="flex items-center gap-4 text-xl">
            <a
              href="https://wa.me/59898273040"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-brand-magenta"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://instagram.com/magentapaysandu"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-brand-magenta"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com/magentapaysandu"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-brand-magenta"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
          </div>
        </div>

        {/* Botón menú mobile */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-slate-800 hover:bg-slate-100 sm:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir menú"
        >
          {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Panel mobile */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white sm:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 text-sm font-medium text-slate-800">
            <a href="/" className="py-1" onClick={() => setIsOpen(false)}>
              Inicio
            </a>
            <a href="/servicios" className="py-1" onClick={() => setIsOpen(false)}>
              Servicios
            </a>
            <a href="/productos" className="py-1" onClick={() => setIsOpen(false)}>
              Productos
            </a>
            <a href="/portfolio" className="py-1" onClick={() => setIsOpen(false)}>
              Trabajos
            </a>
            <a
              href="/presupuesto"
              className="mt-2 rounded-full bg-brand-magenta px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-brand-rosa transition"
              onClick={() => setIsOpen(false)}
            >
              Pedir presupuesto
            </a>

            <div className="mt-2 flex items-center gap-4 text-xl">
              <a
                href="https://wa.me/59898273040"
                target="_blank"
                rel="noreferrer"
                className="text-slate-600 hover:text-brand-magenta"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://instagram.com/magentapaysandu"
                target="_blank"
                rel="noreferrer"
                className="text-slate-600 hover:text-brand-magenta"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://facebook.com/magentapaysandu"
                target="_blank"
                rel="noreferrer"
                className="text-slate-600 hover:text-brand-magenta"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}