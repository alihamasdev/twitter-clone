import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";

import "@/styles/theme.css";
import { chirp } from "./fonts/chirp";
import { QueryProviders } from "@/lib/tanstack/query-provider";
import { ThemeProvider } from "@/lib/theme-provider";

export const metadata: Metadata = {
	title: {
		template: "%s | Twitter",
		default: "Twitter"
	},
	description: "Full stack twitter clone with next.js, supabase, tailwindcss and shadcn"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body style={chirp.style}>
				<ThemeProvider attribute="data-theme" defaultTheme="dark">
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
