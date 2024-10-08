import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Helvetica Neue", ...fontFamily.sans],
				serif: [...fontFamily.serif],
				agrandir: ["Agrandir", ...fontFamily.sans],
				telegraf: ["Telegraf", ...fontFamily.sans],
			},
			colors: {
				accent: "var(--color-accent)",
				secondary: "var(--color-secondary)",
				light: "var(--color-light)",
			},
			
			
		},
	},
	plugins: [],
};
export default config;
