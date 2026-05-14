export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {

            // ✨ Animations
            animation: {
                "fade-in": "fadeIn 0.8s ease-in-out",
                "fade-in-up": "fadeInUp 0.8s ease-in-out",
                "slide-down": "slideDown 0.6s ease-in-out",
                "bounce-slow": "bounce 2s infinite",
            },

            // 🎬 Keyframes
            keyframes: {
                fadeIn: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },

                fadeInUp: {
                    "0%": { opacity: 0, transform: "translateY(20px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },

                slideDown: {
                    "0%": { opacity: 0, transform: "translateY(-20px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
            },
        },
    },

    plugins: [],
};