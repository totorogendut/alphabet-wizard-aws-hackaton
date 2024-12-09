import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwind from "@tailwindcss/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";

export default defineConfig({
  plugins: [enhancedImages(), sveltekit(), tailwind()],
});
