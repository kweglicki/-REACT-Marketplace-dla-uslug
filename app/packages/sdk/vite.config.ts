import { defineConfig } from "vite";
export default defineConfig({
build: { lib: { entry: "src/api.ts", name: "MarketplaceSDK", formats: ["es","cjs"], fileName: (f) => `index.${f}.js` },
rollupOptions: { external: ["@reduxjs/toolkit/query/react","zod"] } }
});