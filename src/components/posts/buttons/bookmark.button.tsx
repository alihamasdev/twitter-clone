"use client";

import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";

import { axios } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { type PostData } from "@/types/post";
import { Icon } from "@/components/ui/icon";

interface BookmarkButtonProps extends React.ComponentProps<typeof motion.button> {
	isBookmarked: boolean;
	postId: string;
}

export function BookmarkButton({ isBookmarked, postId, className, ...props }: BookmarkButtonProps) {
	const queryClient = useQueryClient();
	const queryKey: QueryKey = [`post`, postId];

	const { mutate } = useMutation({
		mutationFn: () =>
			isBookmarked ? axios.delete(`/api/posts/${postId}/bookmark`) : axios.post(`/api/posts/${postId}/bookmark`),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });

			const prevState = queryClient.getQueryData<PostData>(queryKey);

			queryClient.setQueryData<PostData>(queryKey, (oldData) =>
				oldData ? { ...oldData, isBookmarked: oldData.isBookmarked ? false : true } : undefined
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
