# Imprenta Magenta Paysandú - Website (MVP)

Sitio web moderno y orientado a conversión desarrollado para **Imprenta Magenta Paysandú**, una imprenta con más de 15 años de trayectoria en impresión digital, offset, packaging, papelería corporativa y productos personalizados.

Este MVP incluye:

- Landing page con CTA principal a WhatsApp + Presupuesto
- Catálogo visual de productos principales
- Página completa de servicios (digital, offset, plotter)
- Formulario inteligente de presupuesto según tipo de trabajo
- Secciones institucionales: Sobre nosotros, Portfolio, Testimonios
- SEO técnico completo (metadata, OG Image, favicon, sitemap, robots)
- Diseño responsive premium, optimizado para Core Web Vitals
- Mockups generados especialmente con IA (Sora)
- Hosting en Vercel + CI/CD automático

---

## 🚀 Tecnologías principales

- **Next.js 16 (App Router)**
- **React 19 + TypeScript**
- **Tailwind CSS**
- **next/image**
- **Vercel**
- **React Icons**
---

## 🌐 Sitio online

- **Demo (Vercel):** https://magenta-paysandu-m5in.vercel.app
- **Dominio real:** https://www.magentauruguay.com

> El dominio será apuntado al deploy final de Vercel.

---

## ⚙️ SEO y Optimización

- Metadata global + metadata por página
- Open Graph Image personalizada (1200×630)
- Favicon completo (16px, 32px, Apple Touch Icon, Android)
- Sitemap automático (`/sitemap.xml`)
- Robots.txt auto-generado
- `metadataBase` con dominio real
- Diseño mobile-first y lightweight

---

## 📁 Estructura del proyecto

```
src/
 └─ app/
     ├─ page.tsx                 → Landing principal
     ├─ servicios/               → Página de servicios
     ├─ productos/               → Página de productos
     ├─ presupuesto/             → Formulario inteligente
     ├─ portfolio/               → Trabajos realizados
     ├─ testimonios/             → Testimonios
     └─ sobre-nosotros/          → Página institucional
public/
 └─ images/                      → Logos, mockups y recursos visuales
```

---

## 🏗️ Instalación y desarrollo local

```bash
npm install
npm run dev
```

Abrir en el navegador:  
`http://localhost:3000`

---

## 🏗️ Build de producción

```bash
npm run build
npm start
```

---

## 🌐 Deploy en Vercel

El sitio se deploya automáticamente a **Vercel** en cada push al branch `main`.

Deploy manual:

```bash
git add .
git commit -m "deploy"
git push
```

---

## ✨ Características destacadas

- Hero con marca y propósito
- Barra de beneficios comerciales
- Catálogo visual con mockups de productos
- Estructura consultiva en la sección de productos
- Portfolio + testimonios listos para contenido real
- Formulario de presupuesto contextual según tipo de trabajo
- SEO completo
- Performance optimizada
- Diseño limpio y profesional

---

## 🆕 Mejoras de arquitectura y mantenibilidad

- Datos de productos y preguntas del formulario extraídos a módulos independientes en `src/data/`
- Refactor del Navbar utilizando un componente `NavLink` para encapsular la lógica de enlaces activos
- Separación más clara entre componentes cliente y servidor siguiendo buenas prácticas del App Router de Next.js

---

## 📦 Créditos

- **Diseño y desarrollo:** Rodrigo Opalo - https://devrodri.com
- **Branding e identidad:** Imprenta Magenta Paysandú
- **Mockups:** generados con IA (Sora)

---

## 📄 Licencia

Uso exclusivo de Imprenta Magenta Paysandú.