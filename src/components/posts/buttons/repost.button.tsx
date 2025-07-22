"use client";

import { useMutation, useQueryClient, type InfiniteData, type QueryKey } from "@tanstack/react-query";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";

import { axios } from "@/lib/axios";
import { cn } from "@/lib/utils";
import type { PostData, PostPage } from "@/types/post";
import { Icon } from "@/components/ui/icon";
import { NumberAnimation } from "@/components/number-animation";

interface RepostButtonProps extends React.ComponentProps<typeof motion.button> {
	isRepost: boolean;
	reposts: number;
	postId: string;
	username: string;
}

export function RepostButton({ postId, isRepost, reposts, username, className, ...props }: RepostButtonProps) {
	const queryClient = useQueryClient();
	const queryKey: QueryKey = [`post`, postId];

	const { mutate } = useMutation({
		mutationFn: () =>
			isRepost ? axios.delete(`/api/posts/${postId}/repost`) : axios.post(`/api/posts/${postId}/repost`),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });

			const prevState = queryClient.getQueryData<PostData>(queryKey);

			queryClient.setQueryData<PostData>(queryKey, (oldData) =>
				oldData
					? {
							...oldData,
							isReposted: oldData.isReposted ? false : true,
							reposts: oldData.reposts + (oldData.isReposted ? -1 : 1)
						}
					: undefined
			);

			return prevState;
		},
		onSuccess(_data, _variables, postData) {
			queryClient.setQueryData<InfiniteData<PostPage, string | null>>([`posts`, `repost`, username], (oldData) => {
				const firstPage = oldData?.pages[0];
				if (!oldData || !firstPage) return oldData;

				return {
					pageParams: oldData.pageParams,
					pages: [
						{
							posts: isRepost
								? [postData, ...firstPage.posts]
								: firstPage.posts.filter((post) => post.id !== postData.id),
							nextCursor: firstPage.nextCursor
						},
						...oldData.pages.slice(1)
					]
				};
			});
		},
		onError(error, _variables, context) {
			console.log(error);
			queryClient.setQueryData(queryKey, context);
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
