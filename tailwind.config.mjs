

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			center: true,
			padding: '1rem',
		},
		extend: {
			colors: {
				primary: {
					50: '#04091C', 100: '#010205', 200: '#02030b', 300: '#020510', 400: '#030715', 500: '#04091c', 600: '#10236f', 700: '#1c3dc3', 800: '#5774e7', 900: '#abb9f3'
				},
				secondary: {
					50: '#a7248b', 100: '#22071c', 200: '#430e38', 300: '#651554', 400: '#871d70', 500: '#a7248b', 600: '#d435b2', 700: '#df68c5', 800: '#ea9ad8', 900: '#f4cdec'
				},
				tertiary: {
					50: '#5128cf', 100: '#100829', 200: '#201052', 300: '#30187b', 400: '#411fa5', 500: '#5128cf', 600: '#714ddd', 700: '#9479e6', 800: '#b8a6ee', 900: '#dbd2f7'
				}
			},
			backgroundImage: {
				customgradient: "linear-gradient(99deg, rgba(4,9,28,1) 37%, rgba(15,32,40,1) 100%)",
				buttom: "linear-gradient(99deg, rgba(255,51,255,1) 15%, rgba(84,46,203,1) 100%)",
				buttom2: "linear-gradient(99deg, rgba(247,29,247,1) 15%, rgba(84,46,203,1) 100%)",
				buttom3: "linear-gradient(99deg, rgb(94, 70, 199) 15%, rgb(9, 51, 217) 100%)",
				buttom4: "linear-gradient(99deg, rgb(0, 225, 205) 15%, rgb(255, 1, 225) 100%)",
				buttom5: "linear-gradient(99deg, rgb(111, 161, 148) 15%, rgb(171, 81, 161) 100%)",
				buttom7: "linear-gradient(99deg, rgb(42, 212, 216) 15%, rgb(171, 81, 161) 100%)",
				buttom8: "linear-gradient(180deg, rgb(255, 1, 225 ) 0%, rgb(28, 12, 140) 50%, rgb(25, 11, 141) 50%, rgb(28, 12, 140,0) 100%)",
				buttom9: "linear-gradient(90deg, rgb(44, 170, 253) 0%, rgb(135, 45, 171) 60%)",
			},
			animation: {
				'text-slide': 'text-slide 7.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
			},
			keyframes: {
				'text-slide': {
					'0%, 26.66%': {
						transform: 'translateY(0%)',
					},
					'33.33%, 60%': {
						transform: 'translateY(-25%)',
					},
					'66.66%, 93.33%': {
						transform: 'translateY(-50%)',
					},
					'100%': {
						transform: 'translateY(-75%)',
					},
				},
			},
		},
	},
	plugins: [],
}