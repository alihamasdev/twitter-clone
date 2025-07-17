"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

import { chirp } from "./fonts/chirp";

interface GlobalErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function GlobalError({ error }: GlobalErrorProps) {
	const isDevEnv = process.env.NODE_ENV === "development";
	const errorMessage = isDevEnv ? error.message : "Something went wrong, but don't fret - let's give it another shot.";

	return (
		<html lang="en">
			<title>Something went wrong | Twitter</title>
			<body style={chirp.style}>
				<main className="flex-center h-dvh w-full flex-col gap-y-6">
					<Icon id="twitter" className="size-15" />
					<h2 className="text-foreground w-4/5 text-center text-lg font-medium text-pretty">{errorMessage}</h2>
					<Button onClick={() => window.location.reload()}>Try Again</Button>
				</main>
			</body>
		</html>
	);
}
