"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { type ProfilePageUser } from "@/types/user";
import { ImageDialogContent } from "@/components/ui/image-dialog";

export default function AvatarImagePage() {
	const queryClient = useQueryClient();
	const { username } = useParams<{ username: string }>();
	const user = queryClient.getQueryData<ProfilePageUser>([`profile`, username]);

	return (
		<ImageDialogContent className="max-w-auto w-full rounded-none">
			{user?.bannerUrl && (
				<Image
					src={user.bannerUrl}
					width={600}
					height={200}
					alt={`${user.name} banner`}
					className="aspect-header w-full object-cover object-center"
				/>
			)}
		</ImageDialogContent>
	);
}
