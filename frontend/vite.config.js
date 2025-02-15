import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ["axios", "socket.io-client"], // Pre-bundle heavy dependencies
        exclude: ["moment"], // Exclude unnecessary large libraries
    },
});
