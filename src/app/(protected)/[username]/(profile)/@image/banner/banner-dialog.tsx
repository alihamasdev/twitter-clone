"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useProfile } from "@/hooks/use-profile";
import { ImageDialog, ImageDialogContent } from "@/components/ui/image-dialog";

export function BannerDialog({ userId, username }: { userId: string; username: string }) {
	const router = useRouter();
	const { data } = useProfile(userId);

	const handleClose = () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		history.length > 1 ? router.back() : router.push(`/${username}`);
	};

	return (
		<ImageDialog onOpenChange={handleClose} open>
			<ImageDialogContent className="max-w-auto w-full rounded-none">
				{data?.bannerUrl && (
					<Image
						src={data.bannerUrl}
						width={1500}
						height={500}
						alt={`${data.name} banner`}
						className="aspect-header w-full object-cover object-center"
					/>
				)}
			</ImageDialogContent>
		</ImageDialog>
	);
}
