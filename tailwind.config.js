/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		colors: {
			navcolor: "#e2e2e2",
			transparent: "transparent",
		},
		cursor: {
			pointc: "url(https://i.postimg.cc/28Wjbm8w/pointer.png), pointer",
			pointa: "url(https://i.postimg.cc/bYGwgj5B/arrow.png), default",
		},
		// boxShadow: {
		// 	glowdm:
		// 		"0 0 1px #fff, 0 0 2px #fff, 0 0 3px #18c7fa, 0 0 4px #18c7fa, 0 0 5px #18c7fa, 0 0 6px #18c7fa, 0 0 7px #18c7fa;",
		// 	glowlm:
		// 		"0 0 1px #fff, 0 0 2px #fff, 0 0 3px #0D1117, 0 0 4px #0D1117, 0 0 5px #0D1117, 0 0 6px #0D1117, 0 0 7px #0D1117;",
		// 	footersd: "0 0 2px #18C7FA",
		// },
	},
	plugins: [require("@tailwindcss/forms")],
};
