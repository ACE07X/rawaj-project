/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981',
                    600: '#059669', // Emerald 600 (Salalah Green)
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                },
                secondary: {
                    500: '#0ea5e9', // Ocean Blue
                    600: '#0284c7',
                },
                accent: {
                    500: '#d97706', // Golden Sand
                    600: '#b45309',
                },
                dark: {
                    800: '#0f172a', // Slate 900
                    900: '#020617', // Slate 950
                }
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui'],
                serif: ['Playfair Display', 'serif'],
                arabic: ['Noto Sans Arabic', 'sans-serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
                'zoom-in': 'zoomIn 1s ease-out forwards',
                'zoom-slow': 'zoomInSlow 20s ease-out infinite alternate',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                zoomIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                zoomInSlow: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.1)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                }
            }
        },
    },
    plugins: [],
}
