"use client";

import { useMutation, useQueryClient, type InfiniteData, type QueryKey } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useAuth } from "@/context/auth-context";
import type { PostPage, PostPayload } from "@/types/post";

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
				if (!oldData) return oldData;

				const newPostPayload = {
					...newPost,
					user: { ...user, _count: { followers: 0 }, followers: [] },
					likes: [],
					bookmarks: [],
					reposts: [],
					_count: { likes: 0, reposts: 0 }
				} satisfies PostPayload;

				const firstPage = oldData.pages[0];
				if (firstPage) {
					return {
						pageParams: oldData.pageParams,
						pages: [
							{ posts: [newPostPayload, ...firstPage.posts], nextCursor: firstPage.nextCursor },
							...oldData.pages.slice(1)
						]
					};
				}

				toast.success("You post has been created");
			});
		},
		onError(error) {
			console.error(error);
			toast.error("Something went wrong while creating post");
		}
	});

	return mutation;
}
