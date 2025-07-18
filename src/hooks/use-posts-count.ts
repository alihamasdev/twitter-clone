"use client";

import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";

export function usePostsCount(userId: string, initialState: { posts: number }) {
	return useQuery({
		queryKey: [`posts`, `count`, userId],
		queryFn: () => axios.get<{ posts: number }>(`/api/users/${userId}/posts-count`).then((res) => res.data),
		initialData: initialState,
		staleTime: Infinity
	});
}
