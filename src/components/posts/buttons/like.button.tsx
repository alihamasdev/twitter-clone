"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";

import { axios } from "@/lib/axios";
import { optimisticPostListUpdate, optimisticUpdate } from "@/lib/tanstack/optimistic-update";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { type PostData } from "@/types/post";
import { Icon } from "@/components/ui/icon";
import { NumberAnimation } from "@/components/number-animation";

interface LikeButtonProps extends React.ComponentProps<typeof motion.button> {
	isLiked: boolean;
	likes: number;
	postId: string;
}

export function LikeButton({ postId, isLiked, likes, className, ...props }: LikeButtonProps) {
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () =>
			isLiked ? axios.delete(`/api/actions/post/${postId}/like`) : axios.post(`/api/actions/post/${postId}/like`),
		onMutate: async () => {
			const [prevPost, newPostData] = await optimisticUpdate<PostData>([`post`, postId], (oldData) =>
				oldData
					? { ...oldData, isLiked: !oldData.isLiked, likes: oldData.likes + (oldData.isLiked ? -1 : 1) }
					: undefined
			);

			const [prevLikePosts] = await optimisticPostListUpdate([`likes`, user.id], (pages) =>
				isLiked
					? pages.map((page) => ({ ...page, posts: page.posts.filter(({ id }) => id !== newPostData!.id) }))
					: [{ posts: [newPostData!, ...pages[0].posts], nextCursor: pages[0].nextCursor }, ...pages.slice(1)]
			);

			return { prevPost, prevLikePosts };
		},
		onError(error, _variables, context) {
			console.log(error);
			toast.error(`Something went wrong, try again`);
			queryClient.setQueryData([`post`, postId], context?.prevPost);
			queryClient.setQueryData([`likes`, user.id], context?.prevLikePosts);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [`post`, postId] });
		}
	});

	return (
		<motion.button
			onClick={() => mutate()}
			whileTap={{ scale: 0.9 }}
			className={cn("group flex cursor-pointer items-center", className)}
			{...props}
		>
			<div className="group-hover:bg-pink/10 flex-center size-8 rounded-full">
				<Icon
					id={isLiked ? "like-solid" : "like"}
					className={cn("group-hover:fill-pink size-4.5", isLiked ? "fill-pink" : "fill-muted-foreground")}
				/>
			</div>
			<span
				className={cn(
					"group-hover:text-pink text-sm",
					isLiked ? "text-pink" : "text-muted-foreground",
					likes < 1 && "invisible"
				)}
			>
				<NumberAnimation value={likes} />
			</span>
		</motion.button>
	);
}
