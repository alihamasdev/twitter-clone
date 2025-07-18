"use client";

import { useMutation, useQueryClient, type InfiniteData, type QueryKey } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useAuth } from "@/context/auth-context";
import type { PostData, PostPage } from "@/types/post";
import { ProfilePageUser } from "@/types/user";

import { createPost } from "./action";

export function useSubmitPostMutation() {
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const queryKey: QueryKey = [`posts`, `feed`];

	const mutation = useMutation({
		mutationFn: createPost,
		onSuccess: async (newPost) => {
			await queryClient.cancelQueries({ queryKey });

			queryClient.setQueriesData<InfiniteData<PostPage, string | null>>({ queryKey }, (oldData) => {
				const firstPage = oldData?.pages[0];
				if (!oldData || !firstPage) return oldData;

				const newPostPayload = {
					...newPost,
					user: { ...user, isFollowedByUser: false, followers: Infinity },
					isBookmarked: false,
					isLiked: false,
					isReposted: false,
					likes: 0,
					reposts: 0
				} satisfies PostData;

				return {
					pageParams: oldData.pageParams,
					pages: [
						{ posts: [newPostPayload, ...firstPage.posts], nextCursor: firstPage.nextCursor },
						...oldData.pages.slice(1)
					]
				};
			});

			queryClient.setQueryData<ProfilePageUser>([`profile`, user.username], (oldData) =>
				oldData ? { ...oldData, posts: oldData.posts + 1 } : oldData
			);

			toast.success("You post has been created");
		},
		onError(error) {
			console.error(error);
			toast.error("Something went wrong while creating post");
		}
	});

	return mutation;
}
