import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PostForm } from "@/components/posts/form/post-form";

export default function ComposePostPage() {
	return (
		<DialogContent className="top-[10%] translate-y-0">
			<div className="relative p-2">
				<DialogTitle />
				<DialogDescription />
				<DialogHeader className="flex-row justify-between">
					<DialogClose variant="ghost" size="icon" icon="cross" />
				</DialogHeader>
				<div className="w-full px-2 pb-2">
					<PostForm isDialog />
				</div>
			</div>
		</DialogContent>
	);
}
