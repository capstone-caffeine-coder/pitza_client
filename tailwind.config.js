/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pitza: {
          lightPink: "#F29595", // 밝은 핑크
          softPink: "#FECCCC", // 부드러운 핑크
          vividRed: "#E51A1A", // 선명한 빨강
          pastelPink: "#F8BFBF", // 파스텔 핑크
          coral: "#FF7F7F", // 코랄
          deepRed: "#C21818", // 딥 레드
          blush: "#F4A3A3", // 블러쉬 핑크
        },
      },
    },
  },
  plugins: [],
};
