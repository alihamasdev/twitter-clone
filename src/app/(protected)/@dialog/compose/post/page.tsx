"use client";

import { useRouter } from "next/navigation";

import { getTweetDate } from "@/lib/date";
import { usePostForm } from "@/context/post-form-context";
import { PostData } from "@/types/post";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { PostForm } from "@/components/posts/form/post-form";
import { TextParser } from "@/components/text-parser";

export default function ComposePostPage() {
	const { push, back } = useRouter();
	const { formParent, setFormParent } = usePostForm();

	const handleClose = () => {
		setFormParent(null);
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		history.length > 1 ? back() : push("/home");
	};

	return (
		<Dialog open={true} onOpenChange={handleClose}>
			<DialogContent className="top-[10%] translate-y-0">
				<div className="relative p-2">
					<DialogTitle />
					<DialogDescription />
					<DialogHeader className="flex-row justify-between">
						<DialogClose variant="ghost" size="icon" icon="cross" />
					</DialogHeader>
					<div className="w-full px-2 pb-2">
						<PostForm
							handleClose={handleClose}
							parentId={formParent ? formParent.id : null}
							placeholder={formParent ? "Post your reply" : "What's happening?"}
						>
							{formParent && <ParentPost data={formParent} />}
						</PostForm>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function ParentPost({ data: { user, content, createdAt } }: { data: PostData }) {
	return (
		<article className="grid w-full grid-cols-[40px_1fr] gap-x-3">
			<div className="flex basis-10 flex-col items-center">
				<Avatar>
					<AvatarImage src={user.avatarUrl} />
				</Avatar>
				<div className="my-1.5 h-full border-x" />
			</div>
			<div className="w-full">
				<div className="flex items-center gap-x-1">
					<p className="text-foreground line-clamp-1 font-bold">{user.name}</p>
					<p className="text-muted-foreground line-clamp-1">{`@${user.username}`}</p>
					<span className="text-muted-foreground">·</span>
					<span className="text-muted-foreground cursor-default">{getTweetDate(createdAt)}</span>
				</div>
				<TextParser className="mt-1 line-clamp-8">{content}</TextParser>
				<div className="text-muted-foreground my-2">
					Replying to <span className="text-accent">{`@${user.username}`}</span>
				</div>
			</div>
		</article>
	);
}
