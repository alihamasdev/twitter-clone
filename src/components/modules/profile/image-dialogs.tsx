import Image from "next/image";
import { type User } from "@/types/user";

import { ImageDialog, ImageDialogContent, ImageDialogTrigger } from "@/components/ui/image-dialog";
import { Avatar, AvatarImage } from "@/components/modules/user";

export function ProfileHeaderImage({ src }: { src: string | null }) {
	if (!src) return <div className="h-50"></div>;

	return (
		<ImageDialog>
			<ImageDialogTrigger asChild>
				<Image
					src={`headers/${src}`}
					width={600}
					height={200}
					alt="header"
					className="flex-center cursor-pointer object-cover object-center transition-[opacity] duration-300 hover:opacity-75"
				/>
			</ImageDialogTrigger>
			<ImageDialogContent className="max-w-auto w-full rounded-none">
				<Image src={`headers/${src}`} width={600} height={200} alt="header" className="bg-image h-auto w-full" />
			</ImageDialogContent>
		</ImageDialog>
	);
}

export function ProfileAvatar({ avatar }: { avatar: User["avatar"] }) {
	return (
		<ImageDialog>
			<ImageDialogTrigger asChild>
				<Avatar className="absolute -bottom-12 left-4 size-25 border-6 lg:-bottom-15 lg:size-33">
					<AvatarImage src={avatar} className="bg-tooltip hover:opacity-100" width={120} height={120} />
				</Avatar>
			</ImageDialogTrigger>
			<ImageDialogContent className="rounded-full">
				<Avatar className="size-50 lg:size-100">
					<AvatarImage src={avatar} className="bg-tooltip hover:opacity-100" width={400} height={400} />
				</Avatar>
			</ImageDialogContent>
		</ImageDialog>
	);
}
