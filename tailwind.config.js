/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		colors: {
			navcolor: "#3c546e",
		},
		cursor: {
			pointc: "url(https://i.postimg.cc/28Wjbm8w/pointer.png), pointer",
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
