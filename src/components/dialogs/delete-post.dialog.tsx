"use client";

import { usePathname, useRouter } from "next/navigation";
import { Post } from "@prisma/client";
import { useMutation, useQueryClient, type InfiniteData, type QueryKey } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { axios } from "@/lib/axios";
import { type PostPage } from "@/types/post";
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

export function DeletePostDialog({ postId, ...props }: React.ComponentProps<typeof Dialog> & { postId: string }) {
	const router = useRouter();
	const path = usePathname();
	const queryClient = useQueryClient();
	const queryKey: QueryKey = [`post`, postId];

	const { mutate } = useMutation({
		mutationFn: () => axios.delete<Post>(`/api/posts/${postId}`),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });

			const prevPosts = queryClient.getQueryData<PostPage>([`posts`, `feed`]);

			queryClient.setQueryData<InfiniteData<PostPage, string | null>>([`posts`, `feed`], (oldData) => {
				if (!oldData) return;
				return {
					pageParams: oldData.pageParams,
					pages: oldData.pages.map((page) => ({
						nextCursor: page.nextCursor,
						posts: page.posts.filter((p) => p.id !== postId)
					}))
				};
			});

			return { prevPosts };
		},
		onError(error, _variables, context) {
			console.error("Error while deleting post", error);
			queryClient.setQueryData([`posts`, `feed`], context?.prevPosts);
			toast.error(`Something went wrong, please try again`);
		},
		onSuccess(data, variables, context) {
			queryClient.removeQueries({ queryKey });
			toast.success(`Your post was deleted`);
		}
	});

	return (
		<Dialog {...props}>
			<DialogContent className="h-75 w-80 p-8">
				<DialogHeader className="mb-0">
					<DialogTitle>Delete post?</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					This can't be undone and it will be removed from your profile, the timeline of any accounts that follow you,
					and from search results.
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
