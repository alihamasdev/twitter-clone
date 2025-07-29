"use client";

import { useEffect } from "react";
import { useInfiniteQuery, type UndefinedInitialDataInfiniteOptions } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { axios } from "@/lib/axios";
import { PostPage } from "@/types/post";
import { Error } from "@/components/ui/error";
import { Spinner } from "@/components/ui/spinner";
import { Post } from "@/components/posts/post";

interface InfinitePostsContainerProps
	extends Omit<UndefinedInitialDataInfiniteOptions<PostPage>, "initialPageParam" | "getNextPageParam" | "queryFn"> {
	apiRouteUrl: string;
	children: React.ReactNode;
	loadingChild?: React.ReactNode;
	errorChild?: React.ReactNode;
}

export function InfinitePostsContainer({
	children,
	apiRouteUrl,
	staleTime = 15 * 60 * 1000,
	loadingChild = <Spinner />,
	errorChild = <Error />,
	...options
}: InfinitePostsContainerProps) {
	const { ref, inView } = useInView({ threshold: 0 });

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
		queryFn: ({ pageParam }) =>
			axios.get<PostPage>(apiRouteUrl, { params: pageParam ? { cursor: pageParam } : {} }).then((res) => res.data),
		initialPageParam: null as string | number | null,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		staleTime,
		...options
	});

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (status === "pending") return loadingChild;

	if (status === "error") return errorChild;

	const posts = data.pages.flatMap((page) => page.posts) || [];

	if (!posts.length) {
		return children;
	}

	return (
		<section className="w-full overflow-hidden pb-50">
			{posts.map((postData, globalIndex) => (
				<Post
					key={postData.id}
					postId={postData.id}
					postData={postData}
					ref={globalIndex === posts.length - 2 ? ref : undefined}
				/>
			))}
			{hasNextPage && <Spinner className="my-10" />}
		</section>
	);
}
