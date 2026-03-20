import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import solidPlugin from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    UnoCSS(),
    solidPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "DriveBit",
        short_name: "DriveBit",
        description: "Track your driving hours with retro game vibes",
        theme_color: "#1A1A2E",
        background_color: "#1A1A2E",
        display: "standalone",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
