"use client";

import { chirp } from "./fonts/chirp";
import { createClient } from "@/lib/supabase/client";

import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface GlobalErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function GlobalError({ error }: GlobalErrorProps) {
	const errorMessage =
		process.env.NODE_ENV === "development"
			? error.message
			: "Something went wrong, but don't fret - let's give it another shot.";

	const resetFn = async () => {
		if (error.message === "User not authenticated" || error.message === "User not found") {
			const supabase = createClient();
			await supabase.auth.signOut();
		}

		window.location.reload();
	};

	return (
		<html lang="en">
			<body style={chirp.style}>
				<main className="flex-center h-dvh w-full flex-col gap-y-6">
					<Icon id="twitter" className="size-15" />
					<h2 className="text-foreground text-base font-normal">{errorMessage}</h2>
					<Button onClick={resetFn}>Try again</Button>
				</main>
			</body>
		</html>
	);
}
