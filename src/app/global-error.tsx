"use client";
import { chirp } from "./fonts/chirp";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface GlobalErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
	return (
		<html lang="en" style={chirp.style}>
			<body className="bg-background text-foreground font-chirp text-base font-medium antialiased">
				<main className="flex-center h-dvh w-full flex-col gap-y-6">
					<Icon id="twitter" className="size-15" />
					<h2 className="text-foreground text-xl">{error.message}</h2>
					<Button onClick={() => reset()}>Try again</Button>
				</main>
			</body>
		</html>
	);
}
