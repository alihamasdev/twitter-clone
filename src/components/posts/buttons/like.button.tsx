"use client";

import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";

import { axios } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { type PostData } from "@/types/post";
import { Icon } from "@/components/ui/icon";
import { NumberAnimation } from "@/components/number-animation";

interface LikeButtonProps extends React.ComponentProps<typeof motion.button> {
	isLiked: boolean;
	likes: number;
	postId: string;
}

export function LikeButton({ postId, isLiked, likes, className, ...props }: LikeButtonProps) {
	const queryClient = useQueryClient();
	const queryKey: QueryKey = [`post`, postId];

	const { mutate } = useMutation({
		mutationFn: () => (isLiked ? axios.delete(`/api/posts/${postId}/like`) : axios.post(`/api/posts/${postId}/like`)),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });

			const prevState = queryClient.getQueryData<PostData>(queryKey);

			queryClient.setQueryData<PostData>(queryKey, (oldData) =>
				oldData
					? { ...oldData, isLiked: oldData.isLiked ? false : true, likes: oldData.likes + (oldData.isLiked ? -1 : 1) }
					: undefined
			);

			return { prevState };
		},
		onError(error, _variables, context) {
			console.log(error);
			queryClient.setQueryData(queryKey, context?.prevState);
			toast.error(`Something went wrong, try again`);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey })
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
