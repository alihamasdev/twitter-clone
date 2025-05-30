"use client";

import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { type ProfilePageUser } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageDialog, ImageDialogContent } from "@/components/ui/image-dialog";

export default function AvatarImagePage() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { username } = useParams<{ username: string }>();
	const user = queryClient.getQueryData<ProfilePageUser>([`profile`, username]);

	const handleClose = () => {
		history.length > 1 ? router.back() : router.push(`/${username}`);
	};

	if (!user) {
		return handleClose();
	}

	return (
		<ImageDialog open={true} onOpenChange={handleClose}>
			<ImageDialogContent>
				<Avatar className="bg-tooltip size-50 lg:size-100">
					<AvatarImage
						width={400}
						height={400}
						src={user?.avatarUrl}
						className="hover:opacity-100"
						alt={`${user?.name} avatar`}
					/>
					<AvatarFallback />
				</Avatar>
			</ImageDialogContent>
		</ImageDialog>
	);
}
