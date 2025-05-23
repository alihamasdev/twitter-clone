import Image from "next/image";

import { cn } from "@/lib/utils";

import { ImageDialog, ImageDialogContent, ImageDialogTrigger } from "@/components/ui/image-dialog";

export function TweetImages({ images }: { images: string[] | null }) {
	if (!images || images.length === 0) return null;

	return (
		<div className="grid grid-cols-2 grid-rows-2 overflow-hidden w-full mt-2 rounded-2xl gap-0.5 border h-[42vw] xs:h-[37vw] md:h-[271px]">
			{images.map((image, index) => (
				<ImageDialog key={image}>
					<ImageDialogTrigger
						className={cn(
							"relative cursor-pointer overflow-hidden w-full",
							images.length === 1 && "col-span-2 row-span-2",
							images.length === 2 && "row-span-2",
							images.length === 3 && index === 0 && "row-span-2"
						)}
					>
						<figure className="relative h-full w-full cursor-pointer transition hover:brightness-75 hover:duration-200">
							<Image src={image} className="object-cover" alt={image.split("/").pop()!} fill />
						</figure>
					</ImageDialogTrigger>
					<ImageDialogContent className="flex max-w-2/3 size-full max-h-2/3 rounded-2xl">
						<Image fill src={image} className="object-contain" alt={image.split("/").pop()!} />
					</ImageDialogContent>
				</ImageDialog>
			))}
		</div>
	);
}
