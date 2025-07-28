"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";

import { axios } from "@/lib/axios";
import { optimisticPostListUpdate, optimiticUpdate } from "@/lib/tanstack/optimistic-update";
import { cn } from "@/lib/utils";
import { type PostData } from "@/types/post";
import { Icon } from "@/components/ui/icon";

interface BookmarkButtonProps extends React.ComponentProps<typeof motion.button> {
	isBookmarked: boolean;
	postId: string;
}

export function BookmarkButton({ isBookmarked, postId, className, ...props }: BookmarkButtonProps) {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () =>
			isBookmarked
				? axios.delete(`/api/actions/post/${postId}/bookmark`)
				: axios.post(`/api/actions/post/${postId}/bookmark`),
		onMutate: async () => {
			const [prevPost, newPostData] = await optimiticUpdate<PostData>([`post`, postId], (oldData) =>
				oldData ? { ...oldData, isBookmarked: !oldData.isBookmarked } : undefined
			);

			const [prevBookmarkPosts] = await optimisticPostListUpdate([`bookmarks`], (pages) =>
				isBookmarked
					? pages.map((page) => ({ ...page, posts: page.posts.filter(({ id }) => id !== newPostData!.id) }))
					: [{ posts: [newPostData!, ...pages[0].posts], nextCursor: pages[0].nextCursor }, ...pages.slice(1)]
			);

			return { prevPost, prevBookmarkPosts };
		},
		onError(error, _variables, context) {
			console.log(error);
			toast.error(`Something went wrong, try again`);
			queryClient.setQueryData([`post`, postId], context?.prevPost);
			queryClient.setQueryData([`bookmarks`], context?.prevBookmarkPosts);
		},
		onSuccess: () => {
			toast.success(isBookmarked ? "Added to your Bookmarks" : "Removed from your Bookmarks");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [`post`, postId] });
		}
	});

	return (
		<motion.button
			whileTap={{ scale: 0.9 }}
			onClick={() => mutate()}
			className={cn("flex-center hover:bg-blue/10 group size-8 cursor-pointer rounded-full", className)}
			{...props}
		>
			<Icon
				id={isBookmarked ? "bookmarks-solid" : "bookmarks"}
				className={cn("group-hover:fill-blue size-4.5", isBookmarked ? "fill-blue" : "fill-muted-foreground")}
			/>
		</motion.button>
	);
}
