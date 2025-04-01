import { defineConfig, type UserConfig } from "vite";
import { glob } from "glob";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";
import SortCss from "postcss-sort-media-queries";

export default defineConfig(({ command }): UserConfig => {
  return {
    define: {
      [command === "serve" ? "global" : "_global"]: {} as Record<
        string,
        unknown
      >,
    },
    root: "src",
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync("./src/*.html"),
        output: {
          manualChunks(id: string) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          entryFileNames: (chunkInfo: { name?: string }) => {
            if (chunkInfo.name === "commonHelpers") {
              return "commonHelpers.js";
            }
            return "[name].js";
          },
          assetFileNames: (assetInfo: { name?: string }) => {
            if (assetInfo.name && assetInfo.name.endsWith(".html")) {
              return "[name].[ext]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },
      outDir: "../dist",
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(["./src/**/**.html"]),
      SortCss({
        sort: "mobile-first",
      }),
    ],
  };
});
