import { InfinitePostsContainer } from "@/components/posts/infinite-posts-container";

export default function BookmarksPage() {
	return (
		<InfinitePostsContainer queryKey={[`bookmarks`]} apiRouteUrl="/api/posts/bookmarks">
			<div className="mx-auto mt-15 flex w-2/3 flex-col gap-y-2">
				<h2 className="text-primary text-center text-2xl font-extrabold">Save Tweets for later</h2>
				<p className="text-muted-foreground text-center text-sm">
					Don&apos;t let the good ones fly away! Bookmark Tweets to easily find them again in the future.
				</p>
			</div>
		</InfinitePostsContainer>
	);
}
