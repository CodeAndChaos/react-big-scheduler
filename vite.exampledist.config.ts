import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        dir: "exampledist/static",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          dayjs: "dayjs",
        },
      },
    },
  },
});
