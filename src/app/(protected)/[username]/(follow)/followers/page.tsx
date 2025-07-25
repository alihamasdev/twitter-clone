import { getUserByUsername } from "@/lib/dal";
import { InfiniteUsersContainer } from "@/components/user/infinite-users-container";

export default async function ProfileFollowersPage({ params }: { params: Promise<{ username: string }> }) {
	const { username } = await params;
	const { userId } = await getUserByUsername(username);

	return (
		<InfiniteUsersContainer apiRouteUrl={`/api/${userId}/followers`} queryKey={[`followers`, userId]}>
			<div className="mx-auto mt-15 flex w-2/3 flex-col gap-y-2">
				<h2 className="text-primary text-center text-2xl font-extrabold">Looking for followers?</h2>
				<p className="text-muted-foreground text-center text-sm">
					When someone follows this account, they&apsos;ll show up here. Tweeting and interacting with others helps
					boost followers.
				</p>
			</div>
		</InfiniteUsersContainer>
	);
}
