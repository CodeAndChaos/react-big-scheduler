import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.jsx",
      name: "react-big-scheduler",
      fileName: "react-big-scheduler",
    },
    rollupOptions: {
      output: {
        dir: "lib",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          dayjs: "dayjs",
        },
      },
    },
  },
});
