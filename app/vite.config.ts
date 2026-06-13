import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/icon.svg"],
      manifest: {
        name: "Lumos — Monitor Light",
        short_name: "Lumos",
        description:
          "Turn any spare monitor into a lamp, music light, or party light. No hardware.",
        start_url: "./",
        scope: "./",
        display: "standalone",
        background_color: "#0d0a08",
        theme_color: "#0d0a08",
        orientation: "any",
        icons: [
          {
            src: "icons/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
