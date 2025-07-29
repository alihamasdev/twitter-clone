import { getParentPostsById } from "@/lib/dal";
import { PostForm } from "@/components/posts/form/post-form";
import { InfinitePostsContainer } from "@/components/posts/infinite-posts-container";
import { Post } from "@/components/posts/post";

import { PagePost } from "./page-post";

export default async function PostPage({ params }: { params: Promise<{ postId: string }> }) {
	const { postId } = await params;
	const { post, parentPosts } = await getParentPostsById(postId);

	return (
		<div className="w-full pb-118">
			{parentPosts.slice(0, parentPosts.length - 1).map((postData) => (
				<Post
					key={postData.id}
					postId={postData.id}
					postData={postData}
					className="border-none pt-1.5 pb-0 first:pt-3"
					hasReplyPost
				/>
			))}

			<PagePost postId={postId} postData={post} />

			<section className="relative w-full border-b px-4 py-3">
				<PostForm placeholder="Post your reply" parentId={postId}>
					<div className="text-muted-foreground mb-3 text-base">
						Replying to <span className="text-accent">{`@${post.user.username}`}</span>
					</div>
				</PostForm>
			</section>

			<InfinitePostsContainer
				queryKey={[`replies`, postId]}
				apiRouteUrl={`/api/posts/${postId}/replies`}
				loadingChild={null}
			>
				{null}
			</InfinitePostsContainer>
		</div>
	);
}
