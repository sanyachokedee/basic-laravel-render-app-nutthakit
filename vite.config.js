import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(() => {

    return {
        plugins: [
            laravel({
                input: ["resources/css/app.css", "resources/js/app.js"],
                refresh: false,
            }),
            tailwindcss(),
        ],
        server: {
            https: true, // Enable HTTPS
        },
        base: "/build/", // หรือปล่อยว่างเป็น '' เพื่อให้ Vite ใช้ relative path
        build: {
            outDir: "public/build",
            assetsDir: "", // ทำให้ assets ไม่อยู่ในโฟลเดอร์ย่อย
        },
        esbuild: {
            jsx: "automatic",
        },
    };
});