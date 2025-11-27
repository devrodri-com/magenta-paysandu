# Imprenta Magenta Paysandú — Website

Sitio web moderno desarrollado para **Imprenta Magenta Paysandú**, una imprenta con más de 15 años de trayectoria en impresión digital, offset, packaging gastronómico, papelería corporativa y productos personalizados.

Este proyecto está construido con **Next.js 16**, **TypeScript**, **TailwindCSS** y un diseño totalmente optimizado para mobile y performance.

---

## 🚀 Tecnologías principales

- **Next.js 16 (App Router)**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Vercel** (hosting y CI/CD)
- **React Icons**
- **Optimización automática de imágenes (`next/image`)**

---

## 📁 Estructura del proyecto

```
src/
 └─ app/
     ├─ page.tsx                 → Landing principal
     ├─ components/              → Navbar, ProductCard, etc.
     ├─ productos/               → Página de productos
     ├─ servicios/               → Página de servicios
     ├─ sobre-nosotros/          → Página institucional
     ├─ testimonios/             → Página de testimonios
     └─ portfolio/               → Trabajos realizados
public/
 └─ images/                      → Logos, mockups y recursos visuales
```

---

## 🛠️ Desarrollo local

```bash
npm install
npm run dev
```

Abrir en el navegador:
```
http://localhost:3000
```

---

## 🏗️ Build de producción

```bash
npm run build
npm start
```

---

## 🌐 Deploy

Este proyecto se deploya automáticamente a **Vercel** cada vez que se hace push al branch `main`.

Para hacer un deploy manual:
```bash
git add .
git commit -m "deploy"
git push
```

Vercel detecta el push → ejecuta build → publica la nueva versión del sitio.

---

## ✨ Características destacadas del sitio

- **Hero full-brand** con degradado Magenta.
- **Barra de beneficios** (WhatsApp inmediato, entregas gratis, impresión premium, envíos y retiros).
- **Catálogo visual de productos principales** con mockups generados especialmente.
- **Secciones institucionales:** Sobre nosotros, testimonios, portfolio.
- **Formulario de contacto completo** + CTA directo a WhatsApp.
- **Diseño responsive premium**, optimizado para conversión.

---

## 📦 Créditos
- Diseño, desarrollo y estructura: **Rodrigo (devrodri-com)**
- Branding e identidad: **Imprenta Magenta Paysandú**
- Mockups generados con IA: **Sora**

---

## 📄 Licencia
Código privado — uso exclusivo de Imprenta Magenta Paysandú.