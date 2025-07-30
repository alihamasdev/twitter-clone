import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { QueryProviders } from "@/lib/tanstack/query-provider";
import { baseUrl, supabaseProjectId } from "@/utils/contants";
import { ThemeProvider } from "@/context/theme-context";
import { chirp } from "@/app/fonts/chirp";

import "@/styles/theme.css";

import { preconnect } from "react-dom";

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: { template: "%s | Twitter", default: "Twitter Clone | Ali Hamas" },
	description: "Full stack twitter clone with next.js, prisma, supabase, tanstack-query, shadcn/ui and tailwindcss",
	authors: { name: "Ali Hamas", url: "https://alihamas.vercel.app" },
	applicationName: "Twitter",
	creator: "Ali Hamas"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	preconnect("https://lh3.googleusercontent.com", { crossOrigin: "anonymous" });
	preconnect("https://avatars.githubusercontent.com", { crossOrigin: "anonymous" });
	preconnect(`https://${supabaseProjectId}.supabase.co/storage/v1/object/public/`, { crossOrigin: "anonymous" });

	return (
		<html lang="en">
			<head>
				<meta property="og:site_name" content="Twitter Clone | Ali Hamas" />
				<meta property="og:url" content="https://twitter-alihamas.vercel.app" />
				<meta name="description" content={metadata.description!} />
			</head>
			<body style={chirp.style}>
				<ThemeProvider>
					<QueryProviders>{children}</QueryProviders>
					<Toaster
						position="bottom-center"
						toastOptions={{
							duration: 3000,
							className: "font-medium text-base",
							style: { ...chirp.style, maxWidth: "90%", color: "white", backgroundColor: "var(--color-accent)" }
						}}
					/>
				</ThemeProvider>
			</body>
		</html>
	);
}
