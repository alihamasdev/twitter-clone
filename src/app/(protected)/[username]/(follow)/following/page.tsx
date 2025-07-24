import { getUserByUsername } from "@/lib/dal";
import { InfiniteUsersContainer } from "@/components/user/infinite-users-container";

export default async function ProfileFollowingPage({ params }: { params: Promise<{ username: string }> }) {
	const { username } = await params;
	const { userId } = await getUserByUsername(username);

	return (
		<InfiniteUsersContainer apiRouteUrl={`/api/users/${userId}/following/users`} queryKey={[`following`, userId]}>
			<div className="mx-auto mt-15 flex w-2/3 flex-col gap-y-2">
				<h2 className="text-primary text-center text-2xl font-extrabold">Be in the know</h2>
				<p className="text-muted-foreground text-center text-sm">
					Following accounts is an easy way to curate your timeline and know what&apsos;s happening with the topics and
					people you&apsos;re interested in.
				</p>
			</div>
		</InfiniteUsersContainer>
	);
}
