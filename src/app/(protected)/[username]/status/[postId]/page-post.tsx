"use client";

import { Fragment } from "react";

import { getFullDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { usePost } from "@/hooks/use-post";
import { type PostData } from "@/types/post";
import { BookmarkButton } from "@/components/posts/buttons/bookmark.button";
import { LikeButton } from "@/components/posts/buttons/like.button";
import { ReplyButton } from "@/components/posts/buttons/reply-button";
import { RepostButton } from "@/components/posts/buttons/repost.button";
import { ShareButton } from "@/components/posts/buttons/share.button";
import { PostOptions } from "@/components/posts/post-options";
import { TextParser } from "@/components/text-parser";
import { Avatar, Name, Username } from "@/components/user";

export function PagePost({ postId, postData }: { postId: string; postData: PostData }) {
	const { data } = usePost(postId, postData);

	return (
		<Fragment>
			<article className={cn("w-full space-y-3 *:px-4", !data.parentId ? "pt-3" : "pt-1.5")}>
				<div className="flex items-start gap-x-3">
					<Avatar src={data.user.avatarUrl} href={data.user.username} />
					<div>
						<Name href={data.user.username}>{data.user.name}</Name>
						<Username href={data.user.username}>{data.user.username}</Username>
					</div>
					<PostOptions className="static ml-auto" user={data.user} postId={postId} />
				</div>
				<TextParser className="text-lg font-medium">{data.content}</TextParser>
				<p className="text-muted-foreground">{getFullDate(data.createdAt)}</p>
				<div className="flex w-full items-center justify-between border-y py-2">
					<ReplyButton postData={data} />
					<RepostButton isRepost={data.isReposted} reposts={data.reposts} postId={postId} />
					<LikeButton isLiked={data.isLiked} likes={data.likes} postId={postId} />
					<BookmarkButton isBookmarked={data.isBookmarked} postId={postId} />
					<ShareButton tweetUrl={`/${data.user.username}/status/${postId}`} />
				</div>
			</article>
		</Fragment>
	);
}
