import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/bolsas",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/papeleria",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/packaging",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/impresion-offset",
        destination: "/servicios",
        permanent: true,
      },
      {
        source: "/impresion-digital",
        destination: "/servicios",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contacto",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/sobre-nosotros",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
