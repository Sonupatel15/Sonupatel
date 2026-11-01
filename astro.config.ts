import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  outDir: "./out",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  server: {
    host: "127.0.0.1",
    port: 3000,
  },
  devToolbar: {
    enabled: false,
  },
});
