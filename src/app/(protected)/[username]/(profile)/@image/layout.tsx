"use client";

import { useParams, useRouter } from "next/navigation";

import { useProfile } from "@/hooks/use-profile";
import { DialogOverlay } from "@/components/ui/dialog";
import { ImageDialog } from "@/components/ui/image-dialog";
import { Spinner } from "@/components/ui/spinner";

export default function ImagesLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { username } = useParams<{ username: string }>();
	const { isPending } = useProfile(username);

	const handleClose = () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		history.length > 1 ? router.back() : router.push(`/${username}`);
	};

	if (isPending) {
		<DialogOverlay className="flex-center">
			<Spinner className="mt-0" />
		</DialogOverlay>;
	}

	return (
		<ImageDialog open={true} onOpenChange={handleClose}>
			{children}
		</ImageDialog>
	);
}
