"use client";

import { useRouter } from "next/navigation";

import { useProfile } from "@/hooks/use-profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageDialog, ImageDialogContent } from "@/components/ui/image-dialog";

export function AvatarDialog({ userId, username }: { userId: string; username: string }) {
	const router = useRouter();
	const { data } = useProfile(userId);

	const handleClose = () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		history.length > 1 ? router.back() : router.push(`/${username}`);
	};

	return (
		<ImageDialog onOpenChange={handleClose} open>
			<ImageDialogContent>
				<Avatar className="bg-tooltip size-50 lg:size-100">
					<AvatarImage
						width={400}
						height={400}
						src={data?.avatarUrl}
						className="hover:opacity-100"
						alt={`${data?.name} avatar`}
					/>
					<AvatarFallback />
				</Avatar>
			</ImageDialogContent>
		</ImageDialog>
	);
}
