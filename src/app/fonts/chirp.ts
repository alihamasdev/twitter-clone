import localFont from "next/font/local";

const chirp = localFont({
	src: [
		{
			path: "./chirp_regular.woff2",
			weight: "400"
		},
		{
			path: "./chirp_medium.woff2",
			weight: "500"
		},
		{
			path: "./chirp_bold.woff2",
			weight: "700"
		},
		{
			path: "./chirp_heavy.woff2",
			weight: "800"
		},
		{
			path: "./chirp_black.woff2",
			weight: "900"
		}
	],
	variable: "--font-chirp",
	weight: "400 500 700 800 900"
});

export { chirp };
