"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";

import { axios } from "@/lib/axios";
import { optimisticPostListUpdate, optimisticUpdate } from "@/lib/tanstack/optimistic-update";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { type PostData, type PostsCount } from "@/types/post";
import { Icon } from "@/components/ui/icon";
import { NumberAnimation } from "@/components/number-animation";

interface RepostButtonProps extends React.ComponentProps<typeof motion.button> {
	isRepost: boolean;
	reposts: number;
	postId: string;
}

export function RepostButton({ postId, isRepost, reposts, className, ...props }: RepostButtonProps) {
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () =>
			isRepost ? axios.delete(`/api/actions/post/${postId}/repost`) : axios.post(`/api/actions/post/${postId}/repost`),
		onMutate: async () => {
			const [prevPost, newPostData] = await optimisticUpdate<PostData>([`post`, postId], (oldData) =>
				oldData
					? { ...oldData, isReposted: !oldData.isReposted, reposts: oldData.reposts + (isRepost ? -1 : 1) }
					: undefined
			);

			const [prevLikePosts] = await optimisticPostListUpdate([`reposts`, user.id], (pages) =>
				isRepost
					? pages.map((page) => ({ ...page, posts: page.posts.filter(({ id }) => id !== newPostData!.id) }))
					: [{ posts: [newPostData!, ...pages[0].posts], nextCursor: pages[0].nextCursor }, ...pages.slice(1)]
			);

			const [prevPostsCount] = await optimisticUpdate<PostsCount>([`posts-count`, user.id], (oldData) =>
				oldData ? { posts: oldData.posts + (isRepost ? -1 : 1) } : oldData
			);

			return { prevPost, prevLikePosts, prevPostsCount };
		},
		onError(error, _variables, context) {
			console.log(error);
			toast.error(`Something went wrong, try again`);
			queryClient.setQueryData([`post`, postId], context?.prevPost);
			queryClient.setQueryData([`reposts`, user.id], context?.prevLikePosts);
			queryClient.setQueryData([`posts-count`, user.id], context?.prevPostsCount);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [`post`, postId] });
			queryClient.invalidateQueries({ queryKey: [`posts-count`, user.id] });
		}
	});

	return (
		<motion.button
			onClick={() => mutate()}
			whileTap={{ scale: 0.9 }}
			aria-label="repost post"
			className={cn("group flex cursor-pointer items-center", className)}
			{...props}
		>
			<div className="group-hover:bg-green/10 flex-center size-8 rounded-full">
				<Icon
					id={isRepost ? "retweet-solid" : "retweet"}
					className={cn("group-hover:fill-green size-4.5", isRepost ? "fill-green" : "fill-muted-foreground")}
				/>
			</div>
			<span
				className={cn(
					"group-hover:text-green text-sm",
					isRepost ? "text-green" : "text-muted-foreground",
					reposts < 1 && "invisible"
				)}
			>
				<NumberAnimation value={reposts} />
			</span>
		</motion.button>
	);
}
