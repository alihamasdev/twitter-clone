"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { axios } from "@/lib/axios";
import { optimisticPostListUpdate, optimisticUpdate } from "@/lib/tanstack/optimistic-update";
import { useAuth } from "@/context/auth-context";
import type { PostData, PostsCount } from "@/types/post";
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
	parentId: string | null;
}

export function DeletePostDialog({ postId, parentId, ...props }: DeletePostDialogProps) {
	const path = usePathname();
	const router = useRouter();
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () => axios.delete(`/api/actions/post/${postId}/delete`),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: [`post`, postId] });
		},
		onSuccess: async () => {
			// Removing post from feed
			await optimisticPostListUpdate([`feed`], (pages) =>
				pages.map((page) => ({
					...page,
					posts: page.posts.filter(({ id, parentId }) => id !== postId && parentId !== postId)
				}))
			);

			// Updating user posts count
			await optimisticUpdate<PostsCount>([`posts-count`, user.id], (oldData) => ({
				posts: (oldData?.posts || 0) - 1
			}));

			// Updating Post replies count
			await optimisticUpdate<PostData>([`post`, parentId], (oldData) =>
				oldData ? { ...oldData, replies: oldData.replies - 1 } : oldData
			);

			if (parentId) {
				// Removing post from user posts
				await optimisticPostListUpdate([`posts`, user.id], (pages) =>
					pages.map((page) => ({
						...page,
						posts: page.posts.filter(({ id, parentId }) => id !== postId && parentId !== postId)
					}))
				);

				// Removing post from parent-post replies
				await optimisticPostListUpdate([`replies`, parentId], (pages) =>
					pages.map((page) => ({
						...page,
						posts: page.posts.filter(({ id, parentId }) => id !== postId && parentId !== postId)
					}))
				);

				// Removing post replies
				queryClient.removeQueries({ queryKey: [`replies`, postId] });
			} else {
				await optimisticPostListUpdate([`replies`, user.id], (pages) =>
					pages.map((page) => ({
						...page,
						posts: page.posts.filter(({ id, parentId }) => id !== postId && parentId !== postId)
					}))
				);
			}

			toast.success("Your post has been deleted");

			queryClient.removeQueries({ queryKey: [`post`, postId] });

			if (!parentId && path.includes("/status")) {
				router.push(`/home`);
			}
		},
		onError: (error) => {
			console.error(error);
			toast.error("Something went wrong while deleting post");
		}
	});

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
					<DialogClose variant="destructive" size="xl" onClick={() => mutate()}>
						Delete
					</DialogClose>
					<DialogClose variant="outline" size="xl">
						Cancel
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
