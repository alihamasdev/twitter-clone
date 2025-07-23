"use client";

import { useDeletePostMutation } from "@/hooks/use-post";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";

interface DeletePostDialogProps extends React.ComponentProps<typeof Dialog> {
	postId: string;
}

export function DeletePostDialog({ postId, ...props }: DeletePostDialogProps) {
	const { user } = useAuth();
	const { mutate } = useDeletePostMutation(postId, user.username);

	return (
		<Dialog {...props}>
			<DialogContent className="h-75 w-80 p-8">
				<DialogHeader className="mb-0">
					<DialogTitle>Delete post?</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					This can&apos;t be undone and it will be removed from your profile, the timeline of any accounts that follow
					you, and from search results.
				</DialogDescription>
				<DialogFooter>
					<Button variant="destructive" size="xl" onClick={() => mutate()}>
						Delete
					</Button>
					<DialogClose variant="outline" size="xl">
						Cancel
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
