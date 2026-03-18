// vite.config.ts
import vue from "file:///Users/stoke/Developer/konnect-with-vue/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vite@5.4.20_@types+node@20.19.17_sass@1.92.1__vue@3.5.21_typescript@5.3.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///Users/stoke/Developer/konnect-with-vue/node_modules/.pnpm/vite@5.4.20_@types+node@20.19.17_sass@1.92.1/node_modules/vite/dist/node/index.js";
import VueDevTools from "file:///Users/stoke/Developer/konnect-with-vue/node_modules/.pnpm/vite-plugin-vue-devtools@7.7.7_rollup@4.59.0_vite@5.4.20_@types+node@20.19.17_sass@1.92.1__vue@3.5.21_typescript@5.3.3_/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///Users/stoke/Developer/konnect-with-vue/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [vue(), VueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: [
          "$bp-sm: 768px;",
          // mobile → tablet
          "$bp-md: 1024px;",
          // tablet → desktop
          "$bp-lg: 1200px;"
          // desktop → wide
        ].join("\n")
      }
    }
  },
  server: {
    open: true,
    proxy: {
      "/api": "http://localhost:4001"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc3Rva2UvRGV2ZWxvcGVyL2tvbm5lY3Qtd2l0aC12dWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zdG9rZS9EZXZlbG9wZXIva29ubmVjdC13aXRoLXZ1ZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvc3Rva2UvRGV2ZWxvcGVyL2tvbm5lY3Qtd2l0aC12dWUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbdnVlKCksIFZ1ZURldlRvb2xzKCldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH0sXG4gIH0sXG4gIGNzczoge1xuICAgIGRldlNvdXJjZW1hcDogdHJ1ZSxcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBzY3NzOiB7XG4gICAgICAgIGFwaTogJ21vZGVybi1jb21waWxlcicsXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBbXG4gICAgICAgICAgJyRicC1zbTogNzY4cHg7JywgLy8gbW9iaWxlIFx1MjE5MiB0YWJsZXRcbiAgICAgICAgICAnJGJwLW1kOiAxMDI0cHg7JywgLy8gdGFibGV0IFx1MjE5MiBkZXNrdG9wXG4gICAgICAgICAgJyRicC1sZzogMTIwMHB4OycsIC8vIGRlc2t0b3AgXHUyMTkyIHdpZGVcbiAgICAgICAgXS5qb2luKCdcXG4nKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgb3BlbjogdHJ1ZSxcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiAnaHR0cDovL2xvY2FsaG9zdDo0MDAxJyxcbiAgICB9LFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVMsT0FBTyxTQUFTO0FBQ3ZULFNBQVMsZUFBZSxXQUFXO0FBQ25DLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8saUJBQWlCO0FBSDhKLElBQU0sMkNBQTJDO0FBTXZPLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO0FBQUEsRUFDOUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILGNBQWM7QUFBQSxJQUNkLHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLEtBQUs7QUFBQSxRQUNMLGdCQUFnQjtBQUFBLFVBQ2Q7QUFBQTtBQUFBLFVBQ0E7QUFBQTtBQUFBLFVBQ0E7QUFBQTtBQUFBLFFBQ0YsRUFBRSxLQUFLLElBQUk7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
