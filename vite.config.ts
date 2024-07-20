// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        sourcemap: false,
    },
    // define: {
    //     'process.env["NEXT_PUBLIC_SECURE_SITE_SDK_URL"]': false,
    //     'process.env["NEXT_PUBLIC_DEFAULT_LOG_LEVEL"]': false
    // }
});