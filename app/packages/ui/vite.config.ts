import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
plugins: [react()],
build: {
lib: {
entry: "src/index.ts",
name: "MarketplaceUI",
formats: ["es","cjs"],
fileName: (format) => `index.${format}.js`,
},
rollupOptions: { external: ["react","react-dom","@mui/material"] },
},
});