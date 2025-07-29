"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { axios } from "@/lib/axios";
import { optimisticPostListUpdate, optimisticUpdate } from "@/lib/tanstack/optimistic-update";
import { useAuth } from "@/context/auth-context";
import { type PostsCount } from "@/types/post";
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
	const path = usePathname();
	const router = useRouter();
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () => axios.delete(`/api/actions/post/${postId}/delete`),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: [`post`, postId] });

			const prevFeedPosts = await optimisticPostListUpdate([`feed`], (pages) =>
				pages.map((page) => ({
					...page,
					posts: page.posts.filter(({ id, parentId }) => id !== postId && parentId !== postId)
				}))
			);

			const prevUserPosts = await optimisticPostListUpdate([`posts`, user.id], (pages) =>
				pages.map((page) => ({
					...page,
					posts: page.posts.filter(({ id, parentId }) => id !== postId && parentId !== postId)
				}))
			);

			const prevUserReplies = await optimisticPostListUpdate([`replies`, user.id], (pages) =>
				pages.map((page) => ({
					...page,
					posts: page.posts.filter(({ id, parentId }) => id !== postId && parentId !== postId)
				}))
			);

			const prevPostsCount = await optimisticUpdate<PostsCount>([`posts-count`, user.id], (oldData) => ({
				posts: (oldData?.posts || 0) - 1
			}));

			return { prevFeedPosts, prevUserPosts, prevUserReplies, prevPostsCount };
		},
		onError: (error, _variables, context) => {
			console.error(error);
			toast.error("Something went wrong while deleting post");
			queryClient.setQueryData([`feed`], context?.prevFeedPosts);
			queryClient.setQueryData([`posts`, user.id], context?.prevUserPosts);
			queryClient.setQueryData([`replies`, user.id], context?.prevUserReplies);
			queryClient.setQueryData([`posts-count`, user.id], context?.prevPostsCount);
		},
		onSuccess: () => {
			toast.success("Your post has been deleted");

			queryClient.removeQueries({ queryKey: [`post`, postId] });

			if (path.includes("/status")) {
				router.push(`/home`);
			}
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
