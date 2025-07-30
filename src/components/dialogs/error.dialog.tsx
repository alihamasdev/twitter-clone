"use client";

import { useRouter } from "next/navigation";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function ErrorDialog() {
	const router = useRouter();

	return (
		<AlertDialog open>
			<AlertDialogContent className="w-80 space-y-4 p-8">
				<AlertDialogTitle className="">Error</AlertDialogTitle>
				<AlertDialogDescription>Oops, something went wrong. Please try again later</AlertDialogDescription>
				<Button aria-label="return to home" onClick={() => router.push("/auth")} size="lg">
					Ok
				</Button>
			</AlertDialogContent>
		</AlertDialog>
	);
}
