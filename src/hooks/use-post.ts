"use client";

import { useMutation, useQuery, useQueryClient, type InfiniteData, type QueryKey } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { axios } from "@/lib/axios";
import { getPostById } from "@/lib/dal";
import type { PostData, PostPage, PostsCount } from "@/types/post";

export function usePost(initialData: PostData) {
	return useQuery({
		queryKey: [`post`, initialData.id],
		queryFn: () => getPostById(initialData.id),
		staleTime: Infinity,
		initialData
	});
}

const updatePostsData = (
	oldData: InfiniteData<PostPage, string | null> | undefined,
	postId: string
): InfiniteData<PostPage, string | null> | undefined => {
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
};

export function useDeletePostMutation(postId: string, userId: string) {
	const queryClient = useQueryClient();

	const feedQueryKey: QueryKey = [`posts`, `feed`];
	const profileQueryKey: QueryKey = [`posts`, userId];
	const postsCountQueryKey: QueryKey = [`posts-count`, userId];

	return useMutation({
		mutationFn: () => axios.delete(`/api/posts/${postId}`),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: feedQueryKey });
			await queryClient.cancelQueries({ queryKey: profileQueryKey });
			await queryClient.cancelQueries({ queryKey: postsCountQueryKey });

			const previousFeedPosts = queryClient.getQueryData<PostPage>(feedQueryKey);
			queryClient.setQueryData<InfiniteData<PostPage, string | null>>(feedQueryKey, (oldData) =>
				updatePostsData(oldData, postId)
			);

			const previousProfilePosts = queryClient.getQueryData<PostPage>(profileQueryKey);
			queryClient.setQueryData<InfiniteData<PostPage, string | null>>(profileQueryKey, (oldData) =>
				updatePostsData(oldData, postId)
			);

			const previousPostsCount = queryClient.getQueryData<PostsCount>(postsCountQueryKey);
			queryClient.setQueryData<PostsCount>(postsCountQueryKey, (oldData) => ({
				posts: (oldData?.posts || 0) - 1
			}));

			return { previousFeedPosts, previousProfilePosts, previousPostsCount };
		},
		onError(error, _variables, context) {
			console.error(error);
			queryClient.setQueryData(feedQueryKey, context?.previousFeedPosts);
			queryClient.setQueryData(profileQueryKey, context?.previousProfilePosts);
			queryClient.setQueryData(postsCountQueryKey, context?.previousPostsCount);
			toast.error("Something went wrong while deleting the post, try again");
		},
		onSuccess: () => {
			toast.success("Post deleted successfully");
			queryClient.removeQueries({ queryKey: [`post`, postId] });
		},
		onSettled() {
			queryClient.invalidateQueries({ queryKey: postsCountQueryKey });
		}
	});
}
