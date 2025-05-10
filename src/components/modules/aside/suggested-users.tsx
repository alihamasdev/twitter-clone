import Link from "next/link";

import { getUsersList } from "@/actions/user/get-users-list";

import { Spinner } from "@/components/ui/spinner";
import { FollowButton, UserCard } from "@/components/modules/user";

export function SuggestedUsersLoader() {
	return (
		<section className="flex-center h-50 w-full overflow-hidden rounded-2xl border">
			<Spinner className="mx-0 mt-0" />
		</section>
	);
}

export async function SuggestedUsers() {
	const data = await getUsersList(3);

	return (
		<section className="w-full overflow-hidden rounded-2xl border">
			<h1 className="px-4 py-3 text-xl font-extrabold">Who to follow</h1>
			{data.map(({ isFollowing, ...user }) => {
				return (
					<UserCard key={user.id} user={user}>
						<FollowButton isFollowing={isFollowing} size="sm" />
					</UserCard>
				);
			})}
			<Link href="/people" className="hover:bg-muted text-accent block px-4 py-3 text-sm transition-colors">
				Show more
			</Link>
		</section>
	);
}
