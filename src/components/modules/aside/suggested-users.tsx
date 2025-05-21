"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getUsersList } from "@/actions/user/get-users-list";

import { Button } from "@/components/ui/button";
import { Error } from "@/components/ui/error";
import { Icon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";
import { UserCard } from "@/components/modules/user";

export function SuggestedUsers() {
	const queryClient = useQueryClient();
	const { data, isError, isPending } = useQuery({
		queryKey: ["users"],
		queryFn: () => getUsersList(4)
	});

	if (isPending) {
		return (
			<section className="flex-center h-75 w-full overflow-hidden rounded-2xl border">
				<Spinner className="mx-0 mt-0" />
			</section>
		);
	}

	if (isError || !data) {
		return (
			<section className="flex-center h-75 w-full overflow-hidden rounded-2xl border">
				<Error className="mt-0">
					<Button size="sm" variant="accent" onClick={() => queryClient.refetchQueries({ queryKey: ["users"] })}>
						<Icon id="retry" className="size-4" />
						Retry
					</Button>
				</Error>
			</section>
		);
	}

	return (
		<section className="w-full overflow-hidden rounded-2xl border">
			<h1 className="px-4 py-3 text-xl font-extrabold">Who to follow</h1>
			{data.map(({ isFollowing, ...user }) => {
				return <UserCard key={user.id} user={user} isFollowing={isFollowing} />;
			})}
		</section>
	);
}
