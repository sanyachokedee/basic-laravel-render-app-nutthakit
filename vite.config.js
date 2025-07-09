import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
            publicDirectory: 'public',            
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        https: false, //เปิดการใช้งาน HTTPS
    },
    // base: '/laventoryapp/', //กำหนด base path ของแอปพลิเคชัน
    // base: '/pedantic-booth.203-170-190-139.plesk.page/', //กำหนด base path ของแอปพลิเคชัน
    base: '/build/', //กำหนด base path ของแอปพลิเคชัน
    build: {
        outDir: 'public/build', //กำหนด output directory สำหรับการ build
        emptyOutDir: true, //ล้าง output directory ก่อนการ build ใหม่
        assetsDir:'' // ทำให้ไฟล์ css และ js อยู่ใน root ของ public/build
    },    
    esbuild: {
        jsx: 'automatic',
    },
})