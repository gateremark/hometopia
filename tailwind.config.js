/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		colors: {
			navcolor: "#3c546e",
		},
		cursor: {
			pointc: "url(src/assets/logo/pointer.png), pointer",
		},
	},
	plugins: [],
};
