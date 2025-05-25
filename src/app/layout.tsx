import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";

import "@/styles/theme.css";

import { QueryProviders } from "@/lib/tanstack/query-provider";
import { ThemeProvider } from "@/lib/theme";
import { baseUrl } from "@/utils/contants";

import { chirp } from "./fonts/chirp";

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: { template: "%s | Twitter", default: "Twitter" },
	description: "Full stack twitter clone with next.js, prisma, supabase and tailwindcss"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body style={chirp.style}>
				<ThemeProvider attribute="class" themes={["dark", "light", "dim"]} defaultTheme="dark">
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
