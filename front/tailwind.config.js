/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'stars': 'radial-gradient(white 1px, transparent 1px)',
            },
            backgroundSize: {
                'dot': '20px 20px',
            },
        },
    },

    plugins: [],
}