import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Vercel: base "/" (default). GitHub Pages: jalankan build dengan VITE_BASE=/nama-repo/
export default defineConfig({ base: process.env.VITE_BASE || "/", plugins: [react(), tailwindcss()] });
