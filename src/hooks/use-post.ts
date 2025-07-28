"use client";

import { useQuery } from "@tanstack/react-query";

import { getPostById } from "@/lib/dal";
import { type PostData } from "@/types/post";

export function usePost(initialData: PostData) {
	return useQuery({
		queryKey: [`post`, initialData.id],
		queryFn: () => getPostById(initialData.id),
		staleTime: Infinity,
		initialData
	});
}
