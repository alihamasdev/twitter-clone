"use client";

import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { PostData } from "@/types/post";

export function usePost(postId: string, initialData?: PostData) {
	return useQuery({
		queryKey: [`post`, postId],
		queryFn: () => axios.get<PostData>(`/api/posts/${postId}`).then((res) => res.data),
		staleTime: Infinity,
		initialData
	});
}
