/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: "#FFF7ED",
                    100: "#FFE5C8",
                    200: "#FFD094",
                    300: "#FFB55A",
                    400: "#FF9A3C",
                    500: "#F57D23",
                    600: "#D96518",
                    700: "#B45010",
                    800: "#8A3E0C",
                    900: "#5C2A08"
                }
            }
        }
    },
    plugins: []
}
