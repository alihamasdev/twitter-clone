"use client";

import { useRouter } from "next/navigation";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { PostForm } from "@/components/posts/form/post-form";

export default function ComposePostPage() {
	const router = useRouter();

	const handleClose = () => {
		history.length > 1 ? router.back() : router.push("/home", { scroll: false });
	};

	return (
		<Dialog open={true} onOpenChange={handleClose}>
			<DialogContent className="top-[10%] translate-y-0">
				<div className="relative p-2">
					<DialogHeader className="flex-row justify-between">
						<DialogTitle className="sr-only">Create new post</DialogTitle>
						<DialogDescription className="sr-only" />
						<DialogClose variant="ghost" size="icon" icon="cross" />
					</DialogHeader>
					<div className="w-full px-2 pb-2">
						<PostForm isDialog />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
