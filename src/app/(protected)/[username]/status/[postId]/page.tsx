import { getPostById } from "@/lib/dal";
import { PostForm } from "@/components/posts/form/post-form";

import { Post } from "./post";

export default async function PostPage({ params }: { params: Promise<{ postId: string }> }) {
	const { postId } = await params;
	const postData = await getPostById(postId);

	return (
		<>
			<Post postData={postData} />
			<div className="relative w-full border-b px-4 py-3">
				<PostForm placeholder="Post your reply" parentId={postData.id}>
					<div className="text-muted-foreground mb-3 text-base">
						Replying to <span className="text-accent">{`@${postData.user.username}`}</span>
					</div>
				</PostForm>
			</div>
		</>
	);
}
