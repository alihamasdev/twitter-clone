"use client";

import { useEffect } from "react";
import { useInfiniteQuery, type UndefinedInitialDataInfiniteOptions } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { axios } from "@/lib/axios";
import { type UserPage } from "@/types/user";
import { Error } from "@/components/ui/error";
import { Spinner } from "@/components/ui/spinner";
import { UserCard } from "@/components/user/user-card";

interface InfiniteUsersContainerProps
	extends Omit<UndefinedInitialDataInfiniteOptions<UserPage>, "initialPageParam" | "getNextPageParam" | "queryFn"> {
	apiRouteUrl: string;
	children: React.ReactNode;
}

export function InfiniteUsersContainer({
	children,
	apiRouteUrl,
	staleTime = 15 * 60 * 1000,
	...options
}: InfiniteUsersContainerProps) {
	const { ref, inView } = useInView({ threshold: 0 });

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
		queryFn: ({ pageParam }) =>
			axios.get<UserPage>(apiRouteUrl, { params: pageParam ? { cursor: pageParam } : {} }).then((res) => res.data),
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

	if (status === "pending") {
		return <Spinner />;
	}

	if (status === "error") {
		return <Error />;
	}

	const users = data.pages.flatMap((page) => page.users) || [];

	if (!users.length) {
		return children;
	}

	return (
		<section className="w-full overflow-hidden pb-50">
			{users.map(({ followers, isFollowedByUser, ...user }, index) => (
				<UserCard
					key={user.id}
					user={user}
					follow={{ followers, isFollowedByUser }}
					ref={index === users.length - 2 ? ref : undefined}
				/>
			))}
			{hasNextPage && <Spinner className="my-10" />}
		</section>
	);
}
