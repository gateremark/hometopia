/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		colors: {
			navcolor: "#3c546e",
			transparent: "transparent",
		},
		cursor: {
			pointc: "url(https://i.postimg.cc/28Wjbm8w/pointer.png), pointer",
			pointa: "url(https://i.postimg.cc/bYGwgj5B/arrow.png), default",
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
