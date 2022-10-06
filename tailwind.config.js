/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                // Theme 1
                mainBackground: 'hsl(var(--mainBackground) / <alpha-value>)',
                keypadBackground:
                    'hsl(var(--keypadBackground) / <alpha-value>)',
                screenBackground:
                    'hsl(var(--screenBackground) / <alpha-value>)',
                delResetBackground:
                    'hsl(var(--delResetBackground) / <alpha-value>)',
                delResetBackgroundShadow:
                    'hsl(var(--delResetBackgroundShadow) / <alpha-value>)',
                equalBackground: 'hsl(var(--equalBackground) / <alpha-value>)',
                equalBackgroundShadow:
                    'hsl(var(--equalBackgroundShadow) / <alpha-value>)',
                keyBackground: 'hsl(var(--keyBackground) / <alpha-value>)',
                keyBackgroundShadow:
                    'hsl(var(--keyBackgroundShadow) / <alpha-value>)',
                keyText: 'hsl(var(--keyText) / <alpha-value>)',
                delResetText: 'hsl(var(--delResetText) / <alpha-value>)',
                equalText: 'hsl(var(--equalText) / <alpha-value>)',
                default: 'hsl(var(--default) / <alpha-value>)',
            },
            fontFamily: {
                leagueSpartan: ['var(--leagueSpartan)'],
            },
        },
    },
    plugins: [],
}
