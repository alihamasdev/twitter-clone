"use client";

import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { PostsCount } from "@/types/post";

export function usePostsCount(userId: string, initialState: PostsCount) {
	return useQuery({
		queryKey: [`posts-count`, userId],
		queryFn: () => axios.get<PostsCount>(`/api/${userId}/posts/count`).then((res) => res.data),
		initialData: initialState,
		staleTime: Infinity
	});
}
