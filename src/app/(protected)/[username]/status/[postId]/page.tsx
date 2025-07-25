"use client";

import { notFound, useParams } from "next/navigation";

import { getFullDate } from "@/lib/date";
import { usePost } from "@/hooks/use-post";
import { Error } from "@/components/ui/error";
import { Spinner } from "@/components/ui/spinner";
import { BookmarkButton } from "@/components/posts/buttons/bookmark.button";
import { CommentButton } from "@/components/posts/buttons/comment-button";
import { LikeButton } from "@/components/posts/buttons/like.button";
import { RepostButton } from "@/components/posts/buttons/repost.button";
import { ShareButton } from "@/components/posts/buttons/share.button";
import { PostOptions } from "@/components/posts/post-options";
import { TextParser } from "@/components/text-parser";
import { Avatar, Name, Username } from "@/components/user";

export default function UserStatusPage() {
	const { postId } = useParams<{ postId: string }>();
	const { data, status, error } = usePost(postId);

	if (status === "pending") {
		return <Spinner />;
	}

	if (status === "error") {
		if (error.message.includes("404")) {
			return notFound();
		}

		return <Error>{error.message}</Error>;
	}

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
				<TextParser>{data.content}</TextParser>
				<p className="text-muted-foreground">{getFullDate(data.createdAt)}</p>
			</article>
			<div className="flex w-full items-center justify-between border-y px-4 py-2">
				<CommentButton />
				<RepostButton isRepost={data.isReposted} reposts={data.reposts} postId={data.id} userId={data.user.id} />
				<LikeButton isLiked={data.isLiked} likes={data.likes} postId={data.id} userId={data.user.id} />
				<BookmarkButton isBookmarked={data.isBookmarked} postId={data.id} />
				<ShareButton tweetUrl={`/${data.user.username}/status/${data.id}`} />
			</div>
		</div>
	);
}
