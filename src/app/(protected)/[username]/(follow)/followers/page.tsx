import { getUserByUsername } from "@/lib/dal";
import { InfiniteUsersContainer } from "@/components/user/infinite-users-container";

export default async function ProfileFollowersPage({ params }: { params: Promise<{ username: string }> }) {
	const { username } = await params;
	const { userId } = await getUserByUsername(username);

	return (
		<InfiniteUsersContainer apiRouteUrl={`/api/users/${userId}/followers/users`} queryKey={[`followers`, userId]}>
			Hello
		</InfiniteUsersContainer>
	);
}
