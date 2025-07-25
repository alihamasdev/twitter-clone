import { Suspense } from "react";

import { getUsersList } from "@/lib/dal";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "@/components/link";
import { UserCard } from "@/components/user/user-card";

export function SuggestedUsers() {
	return (
		<Suspense
			name="suggested users"
			fallback={
				<section className="flex-center h-75 w-full rounded-2xl border">
					<Spinner className="mt-0" />
				</section>
			}
		>
			<UsersList />
		</Suspense>
	);
}

export async function UsersList() {
	const data = await getUsersList();

	return (
		<section className="w-full overflow-hidden rounded-2xl border">
			<h1 className="px-4 py-3 text-xl font-extrabold">Who to follow</h1>
			{data?.map(({ followers, isFollowedByUser, ...user }) => (
				<UserCard key={user.id} user={user} follow={{ followers, isFollowedByUser }} />
			))}
			<Link href={`/people`} className="hover:bg-muted text-accent block w-full px-4 py-3 transition-colors">
				Show more
			</Link>
		</section>
	);
}
