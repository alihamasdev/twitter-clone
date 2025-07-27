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
				comments: 0,
				likes: 0,
				reposts: 0
			} satisfies PostData;

			if (!newPost.parentId) {
				queryClient.setQueriesData<InfiniteData<PostPage, string | null>>({ queryKey }, (oldData) => {
					const firstPage = oldData?.pages[0];
					if (!oldData || !firstPage) return oldData;

					return {
						pageParams: oldData.pageParams,
						pages: [
							{ posts: [newPostPayload, ...firstPage.posts], nextCursor: firstPage.nextCursor },
							...oldData.pages.slice(1)
						]
					};
				});

				queryClient.setQueriesData<InfiniteData<PostPage, string | null>>(
					{ queryKey: [`posts`, user.id] },
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
			} else {
				queryClient.setQueryData<PostData>([`post`, newPost.parentId], (oldData) =>
					oldData ? { ...oldData, comments: oldData.comments + 1 } : oldData
				);
			}

			// Update user profile posts count
			queryClient.setQueryData<PostsCount>([`posts`, `count`, user.id], (oldData) => ({
				posts: (oldData?.posts || 0) + 1
			}));

			toast.success("You post has been created");
		},
		onError(error) {
			console.error(error);
			toast.error("Something went wrong while creating post");
		},
		onSettled(data) {
			queryClient.invalidateQueries({ queryKey: [`post`, data?.id] });
			queryClient.invalidateQueries({ queryKey: [`post`, data?.parentId] });
			queryClient.invalidateQueries({ queryKey: [`posts`, `count`, user.id] });
		}
	});

	return mutation;
}
