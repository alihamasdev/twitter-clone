import { getUserByUsername } from "@/lib/dal";
import { InfinitePostsContainer } from "@/components/posts/infinite-posts-container";

export default async function ProfileTweetsPage({ params }: { params: Promise<{ username: string }> }) {
	const { username } = await params;
	const { userId } = await getUserByUsername(username);

	return (
		<InfinitePostsContainer queryKey={[`posts`, userId]} apiRouteUrl={`/api/${userId}/posts`}>
			<div className="mx-auto mt-15 flex w-2/3 flex-col gap-y-2">
				<h2 className="text-primary text-center text-2xl font-extrabold">{`@${username} hasn't posted anything yet`}</h2>
				<p className="text-muted-foreground text-center text-sm">When they do, their posts will show up here</p>
			</div>
		</InfinitePostsContainer>
	);
}
