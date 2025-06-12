"use client";

import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { axios } from "@/lib/axios";
import { PostData, type PostPage } from "@/types/post";
import { Error } from "@/components/ui/error";
import { Spinner } from "@/components/ui/spinner";
import { Post } from "@/components/posts/post";

export default function HomePage() {
	const { ref, inView } = useInView({ threshold: 0 });
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
		queryKey: [`posts`, `feed`],
		queryFn: ({ pageParam }) =>
			axios.get<PostPage>(`/api/posts`, { params: pageParam ? { cursor: pageParam } : {} }).then((res) => res.data),
		initialPageParam: null as string | null,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		staleTime: 15 * 60 * 100
	});

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (status === "pending") {
		return <Spinner />;
	}

	if (status === "error") {
		return <Error />;
	}

	const posts = data.pages.flatMap((page) => page.posts) || [];

	if (!posts.length) {
		return <p className="mt-15 text-base text-muted-foreground text-center">No one has posted anything yet.</p>;
	}

	return (
		<section className="w-full pb-96">
			{posts.map((data, index) => {
				const postData = {
					id: data.id,
					content: data.content,
					createdAt: data.createdAt,
					userId: data.userId,
					user: {
						id: data.user.id,
						name: data.user.name,
						username: data.user.username,
						avatarUrl: data.user.avatarUrl,
						followers: data.user._count.followers,
						isFollowedByUser: !!data.user.followers.length
					},
					likes: data._count.likes,
					reposts: data._count.reposts,
					isBookmarked: !!data.bookmarks.length,
					isLiked: !!data.likes.length,
					isReposted: !!data.reposts.length
				} satisfies PostData;
				const lastItem = index === posts.length - 2;

				return <Post key={data.id} post={postData} ref={lastItem ? ref : undefined} />;
			})}
			{isFetchingNextPage && <Spinner className="my-10" />}
		</section>
	);
}
