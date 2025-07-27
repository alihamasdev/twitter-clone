"use client";

import { getFullDate } from "@/lib/date";
import { usePost } from "@/hooks/use-post";
import { type PostData } from "@/types/post";
import { BookmarkButton } from "@/components/posts/buttons/bookmark.button";
import { CommentButton } from "@/components/posts/buttons/comment-button";
import { LikeButton } from "@/components/posts/buttons/like.button";
import { RepostButton } from "@/components/posts/buttons/repost.button";
import { ShareButton } from "@/components/posts/buttons/share.button";
import { PostOptions } from "@/components/posts/post-options";
import { TextParser } from "@/components/text-parser";
import { Avatar, Name, Username } from "@/components/user";

export function Post({ postData }: { postData: PostData }) {
	const { data } = usePost(postData);

	const tweetUrl = `/${data.user.username}/status/${data.id}`;

	return (
		<div className="w-full">
			<article className="space-y-3 px-4 py-3">
				<div className="flex items-start gap-x-3">
					<Avatar src={data.user.avatarUrl} href={data.user.username} />
					<div className="relative flex w-full items-center justify-between">
						<div>
							<Name href={data.user.username}>{data.user.name}</Name>
							<Username href={data.user.username}>{data.user.username}</Username>
						</div>
						<PostOptions className="right-0 ml-auto" user={data.user} postId={data.id} />
					</div>
				</div>
				<TextParser className="text-lg font-medium">{data.content}</TextParser>
				<p className="text-muted-foreground">{getFullDate(data.createdAt)}</p>
			</article>
			<div className="flex w-full items-center justify-between border-y px-4 py-2">
				<CommentButton postData={data} />
				<RepostButton isRepost={data.isReposted} reposts={data.reposts} postId={data.id} />
				<LikeButton isLiked={data.isLiked} likes={data.likes} postId={data.id} />
				<BookmarkButton isBookmarked={data.isBookmarked} postId={data.id} />
				<ShareButton tweetUrl={tweetUrl} />
			</div>
		</div>
	);
}
