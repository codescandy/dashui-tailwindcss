/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.html'],
	theme: {
		fontSize: {
			sm: '0.75rem',
			base: '0.9375rem',
			lg: '1rem',
			xl: '1.25rem',
			'2xl': '1.563rem',
			'3xl': '1.953rem',
			'4xl': '2.441rem',
			'5xl': '3.052rem',
		},
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: '#333',
						a: {
							color: '#3182ce',
							'&:hover': {
								color: '#624BFF',
							},
						},
					},
				},
			}),

			colors: {
				blue: {
					600: '#624bff',
					800: '#5340d9',
				},
			},
		},
	},
	variants: {},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
