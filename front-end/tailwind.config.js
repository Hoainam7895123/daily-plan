/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // File HTML chính
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Quét các file Vue, JS/TS
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Xanh dương chủ đạo
        secondary: "#9333EA", // Tím phụ
      },
      spacing: {
        128: "32rem", // Thêm khoảng cách lớn
        144: "36rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Font chữ mặc định
      },
    },
  },
  plugins: [
    // require("@tailwindcss/forms"), // Hỗ trợ styles cho form
    // require("@tailwindcss/typography"), // Hỗ trợ kiểu chữ nâng cao
    // require("@tailwindcss/aspect-ratio"), // Hỗ trợ aspect ratio
  ],
};
