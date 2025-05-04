import Image from "next/image";

import { type User } from "@/types/user";

import { ImageDialog, ImageDialogContent, ImageDialogTrigger } from "@/components/ui/image-dialog";
import { Avatar, AvatarImage } from "@/components/modules/user";

export function ProfileHeaderImage({ src }: { src: string | null }) {
	if (!src) return <div className="aspect-header bg-image relative"></div>;

	return (
		<div className="bg-image aspect-header relative overflow-hidden border-b">
			<ImageDialog>
				<ImageDialogTrigger asChild>
					<Image
						src={src}
						width={600}
						height={200}
						alt="header"
						className="aspect-header w-full cursor-pointer object-cover transition-[opacity] duration-300 hover:opacity-75"
					/>
				</ImageDialogTrigger>
				<ImageDialogContent className="max-w-auto w-full rounded-none">
					<Image
						src={src}
						width={600}
						height={200}
						alt="header"
						className="aspect-header w-full object-cover object-center"
					/>
				</ImageDialogContent>
			</ImageDialog>
		</div>
	);
}

export function ProfileAvatar({ avatar }: { avatar: User["avatar"] }) {
	return (
		<ImageDialog>
			<ImageDialogTrigger asChild>
				<Avatar className="bg-tooltip absolute -bottom-12 left-4 size-25 border-6 lg:-bottom-15 lg:size-33">
					<AvatarImage src={avatar} width={120} height={120} />
				</Avatar>
			</ImageDialogTrigger>
			<ImageDialogContent className="rounded-full">
				<Avatar className="bg-tooltip size-50 lg:size-100">
					<AvatarImage src={avatar} className="hover:opacity-100" width={400} height={400} />
				</Avatar>
			</ImageDialogContent>
		</ImageDialog>
	);
}
