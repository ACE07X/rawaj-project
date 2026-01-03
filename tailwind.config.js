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
                    50: '#f2fcf5',
                    100: '#e1f8e8',
                    200: '#c3efd2',
                    300: '#94e0b3',
                    400: '#5cc78e',
                    500: '#34d399', // Kept vibrant for UI elements
                    600: '#16a34a', // Lush Green
                    700: '#15803d', // Deep Khareef
                    800: '#166534',
                    900: '#14532d',
                    950: '#052e16', // Very dark green background
                },
                secondary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e', // Ocean depths
                },
                accent: {
                    50: '#fbf7eb',
                    100: '#f5ebd1',
                    200: '#ebd9a8',
                    300: '#e0c275',
                    400: '#d4af37', // Frankincense Gold
                    500: '#b89628',
                    600: '#9b7b1e',
                    700: '#7d6018',
                    800: '#664d18',
                    900: '#543f16',
                },
                dark: {
                    900: '#020617', // Deep night
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
