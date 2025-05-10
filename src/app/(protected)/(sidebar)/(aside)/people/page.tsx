import { getUsersList } from "@/actions/user/get-users-list";

import { FollowButton, UserCard } from "@/components/modules/user";

export default async function PeoplePage() {
	const data = await getUsersList();

	return data?.map(({ isFollowing, ...user }) => {
		return (
			<UserCard key={user.id} user={user}>
				<FollowButton isFollowing={isFollowing} />
			</UserCard>
		);
	});
}
