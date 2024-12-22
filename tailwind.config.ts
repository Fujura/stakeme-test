import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			screens: {
				xs: "480px", // Например, добавляем свою точку перелома "xs" для 480px
			},
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			keyframes: {
				modal: {
					"0%": {
						scale: "0",
					},
					"100%": {
						scale: "1",
					},
				},
				dash: {
					"0%": { strokeDasharray: "0 100", opacity: "0" },
					"50%": { opacity: "1" },
					"100%": { strokeDasharray: "100", opacity: "1" },
				},
			},
			animation: {
				dash: "dash 2s ease-in-out forwards 0.5s",
				modal: "modal 0.3s ease-in-out",
			},
		},
	},
	plugins: [],
};
export default config;
