import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El script de medicion y su endpoint se sirven desde ESTE dominio, no desde
  // app.itmano.com. Asi la medicion es first-party:
  //
  //   - Los bloqueadores de rastreo y la proteccion de Safari/Brave no la tocan:
  //     para el navegador es el mismo sitio, no un tercero.
  //   - No hay peticion cross-origin, asi que no depende de CORS.
  //   - Y no se cruza con el bot-check del otro dominio, que desde una IP de VPN
  //     o de un pais filtrado puede devolver un reto en vez de la respuesta.
  //
  // intake.js deriva su base de su propio `src`, asi que basta con cargarlo desde
  // una ruta local: sus llamadas salen solas por aqui.
  async rewrites() {
    return [
      { source: "/intake.js",          destination: "https://app.itmano.com/intake.js" },
      { source: "/api/intake/:path*",  destination: "https://app.itmano.com/api/intake/:path*" },
    ]
  },
};

export default nextConfig;
