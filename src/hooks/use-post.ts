"use client";

import { useMutation, useQuery, useQueryClient, type InfiniteData, type QueryKey } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { axios } from "@/lib/axios";
import type { PostData, PostPage } from "@/types/post";

export function usePost(postId: string, initialData?: PostData) {
	return useQuery({
		queryKey: [`post`, postId],
		queryFn: () => axios.get<PostData>(`/api/posts/${postId}`).then((res) => res.data),
		staleTime: Infinity,
		initialData
	});
}

export function useDeletePostMutation(postId: string, username: string) {
	const queryClient = useQueryClient();

	const feedQueryKey: QueryKey = [`posts`, `feed`];
	const profileQueryKey: QueryKey = [`posts`, username];

	return useMutation({
		mutationFn: () => axios.delete(`/api/posts/${postId}`),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: feedQueryKey });
			await queryClient.cancelQueries({ queryKey: profileQueryKey });

			const previousFeedPosts = queryClient.getQueryData<PostPage>(feedQueryKey);
			queryClient.setQueryData<InfiniteData<PostPage, string | null>>(feedQueryKey, (oldData) => {
				const firstPage = oldData?.pages[0];
				if (!oldData || !firstPage) return oldData;

				return {
					pageParams: oldData.pageParams,
					pages: [
						{
							posts: firstPage.posts.filter((post) => post.id !== postId),
							nextCursor: firstPage.nextCursor
						},
						...oldData.pages.slice(1)
					]
				};
			});

			const previousProfilePosts = queryClient.getQueryData<PostPage>(profileQueryKey);
			queryClient.setQueryData<InfiniteData<PostPage, string | null>>([`posts`, username], (oldData) => {
				const firstPage = oldData?.pages[0];
				if (!oldData || !firstPage) return oldData;

				return {
					pageParams: oldData.pageParams,
					pages: [
						{
							posts: firstPage.posts.filter((post) => post.id !== postId),
							nextCursor: firstPage.nextCursor
						},
						...oldData.pages.slice(1)
					]
				};
			});

			return { previousFeedPosts, previousProfilePosts };
		},
		onError(error, _variables, context) {
			console.error(error);
			queryClient.setQueryData(feedQueryKey, context?.previousFeedPosts);
			queryClient.setQueryData(profileQueryKey, context?.previousProfilePosts);
			toast.error("Something went wrong while deleting the post, try again");
		},
		onSuccess: () => {
			toast.success("Post deleted successfully");
			queryClient.removeQueries({ queryKey: [`post`, postId] });
		}
	});
}
