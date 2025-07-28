import { InfinitePostsContainer } from "@/components/posts/infinite-posts-container";

export default function HomePage() {
	return (
		<InfinitePostsContainer queryKey={[`feed`]} apiRouteUrl="/api/feed" refetchInterval={15 * 1000}>
			<p className="text-muted-foreground mt-15 text-center text-base">No one has posted anything yet</p>
		</InfinitePostsContainer>
	);
}
