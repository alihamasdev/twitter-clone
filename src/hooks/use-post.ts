"use client";

import { useQuery } from "@tanstack/react-query";

import { getPostById } from "@/lib/dal";
import { type PostData } from "@/types/post";

export function usePost(postId: string, initialData: PostData) {
	return useQuery({
		queryKey: [`post`, postId],
		queryFn: () => getPostById(postId),
		staleTime: Infinity,
		initialData
	});
}
