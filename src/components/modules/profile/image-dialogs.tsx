import Image from "next/image";
import { type User } from "@/types/user";

import { ImageDialog, ImageDialogContent, ImageDialogTrigger } from "@/components/ui/image-dialog";
import { Avatar } from "@/components/modules/user";

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

export function ProfileAvatar({ user }: { user: User }) {
	return (
		<ImageDialog>
			<ImageDialogTrigger asChild>
				<Avatar
					user={user}
					className="absolute -bottom-12 left-4 size-25 border-6 lg:-bottom-15 lg:size-33"
					imageProps={{ className: "hover:opacity-100" }}
					fallbackProps={{ className: "text-[36px] lg:text-[48px]" }}
				/>
			</ImageDialogTrigger>
			<ImageDialogContent className="rounded-full">
				<Avatar
					user={user}
					className="size-50 lg:size-100"
					imageProps={{ className: "hover:opacity-100" }}
					fallbackProps={{ className: "text-[80px] lg:text-[160px]" }}
				/>
			</ImageDialogContent>
		</ImageDialog>
	);
}
