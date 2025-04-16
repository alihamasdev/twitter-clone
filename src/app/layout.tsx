import { type Metadata } from "next";

import "@/styles/theme.css";
import { chirp } from "./fonts/chirp";

export const metadata: Metadata = {
	title: "Twitter",
	description: "Full stack twitter clone with next.js, supabase, tailwindcss and shadcn"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="bg-background text-foreground text-base font-medium antialiased" style={chirp.style}>
				{children}
			</body>
		</html>
	);
}
