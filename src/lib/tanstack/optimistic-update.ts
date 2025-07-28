import type { InfiniteData, QueryKey } from "@tanstack/react-query";

import { getQueryClient } from "@/lib/tanstack/get-query-client";
import { type PostPage } from "@/types/post";

export async function optimiticUpdate<T>(queryKey: QueryKey, updator: (oldData: T | undefined) => T | undefined) {
	const queryClient = getQueryClient();

	await queryClient.cancelQueries({ queryKey });

	const previousData = queryClient.getQueryData<T>(queryKey);

	const updatedData = queryClient.setQueryData<T>(queryKey, updator);

	return [previousData, updatedData];
}

export async function optimisticPostListUpdate(
	queryKey: QueryKey,
	updater: (pages: PostPage[], firstPage: PostPage) => PostPage[]
) {
	const queryClient = getQueryClient();

	await queryClient.cancelQueries({ queryKey });

	const previousData = queryClient.getQueryData<InfiniteData<PostPage, string | number | null>>(queryKey);

	const updatedData = queryClient.setQueryData<InfiniteData<PostPage, string | number | null>>(queryKey, (oldData) => {
		if (!oldData) return oldData;

		return { pageParams: oldData.pageParams, pages: updater(oldData.pages, oldData.pages[0]) };
	});

	return [previousData, updatedData];
}
