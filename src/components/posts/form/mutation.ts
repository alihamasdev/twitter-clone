"use client";

import { useMutation, useQueryClient, type InfiniteData, type QueryKey } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useAuth } from "@/context/auth-context";
import type { PostData, PostPage, PostsCount } from "@/types/post";

import { createPost } from "./action";

export function useSubmitPostMutation() {
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const queryKey: QueryKey = [`posts`, `feed`];

	const mutation = useMutation({
		mutationFn: createPost,
		onSuccess: async (newPost) => {
			await queryClient.cancelQueries({ queryKey });

			const newPostPayload = {
				...newPost,
				user: { ...user, isFollowedByUser: false, followers: 0 },
				isBookmarked: false,
				isLiked: false,
				isReposted: false,
				likes: 0,
				reposts: 0
			} satisfies PostData;

			// Update both feed and user profile posts in a single operation
			queryClient.setQueriesData<InfiniteData<PostPage, string | null>>(
				{
					queryKey: [`posts`],
					predicate: ({ queryKey }) => queryKey.includes(`feed`) || queryKey.includes(user.username)
				},
				(oldData) => {
					const firstPage = oldData?.pages[0];
					if (!oldData || !firstPage) return oldData;

					return {
						pageParams: oldData.pageParams,
						pages: [
							{ posts: [newPostPayload, ...firstPage.posts], nextCursor: firstPage.nextCursor },
							...oldData.pages.slice(1)
						]
					};
				}
			);

			// Update user profile posts count
			queryClient.setQueryData<PostsCount>([`posts`, `count`, user.id], (oldData) => ({
				posts: (oldData?.posts || 0) + 1
			}));

			toast.success("You post has been created");
		},
		onError(error) {
			console.error(error);
			toast.error("Something went wrong while creating post");
		}
	});

	return mutation;
}
