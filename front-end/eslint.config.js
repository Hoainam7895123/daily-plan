import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
    {
        name: "app/files-to-lint",
        files: ["**/*.{js,mjs,jsx,vue}"], // Lint các tệp JS và Vue
    },

    {
        name: "app/files-to-ignore",
        ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"], // Bỏ qua các thư mục build
    },

    // Sử dụng cấu hình cơ bản của JS và Vue
    js.configs.recommended,
    pluginVue.configs["flat/essential"], // Chỉ kiểm tra lỗi quan trọng trong Vue
];
