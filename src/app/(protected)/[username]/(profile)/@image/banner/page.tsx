"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { type ProfilePageUser } from "@/types/user";
import { ImageDialog, ImageDialogContent } from "@/components/ui/image-dialog";

export default function AvatarImagePage() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { username } = useParams<{ username: string }>();
	const user = queryClient.getQueryData<ProfilePageUser>([`profile`, username]);

	const handleClose = () => {
		history.length > 1 ? router.back() : router.push(`/${username}`);
	};

	if (!user || !user.bannerUrl) {
		return handleClose();
	}

	return (
		<ImageDialog open={true} onOpenChange={handleClose}>
			<ImageDialogContent className="max-w-auto w-full rounded-none">
				<Image
					src={user.bannerUrl}
					width={600}
					height={200}
					alt={`${user.name} banner`}
					className="aspect-header w-full object-cover object-center"
				/>
			</ImageDialogContent>
		</ImageDialog>
	);
}
