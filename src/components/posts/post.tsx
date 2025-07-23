"use client";

import { useRouter } from "next/navigation";
import { motion, type HTMLMotionProps } from "motion/react";

import { getTweetDate } from "@/lib/date";
import { usePost } from "@/hooks/use-post";
import { type PostData } from "@/types/post";
import { Avatar, Name, Username } from "@/components/user";

import { BookmarkButton } from "./buttons/bookmark.button";
import { CommentButton } from "./buttons/comment-button";
import { LikeButton } from "./buttons/like.button";
import { RepostButton } from "./buttons/repost.button";
import { ShareButton } from "./buttons/share.button";
import { PostOptions } from "./post-options";

interface PostProps extends HTMLMotionProps<"article"> {
	post: PostData;
}

export function Post({ post, ...props }: PostProps) {
	const router = useRouter();

	const { data } = usePost(post.id, post);
	if (!data) return null;

	return (
		<motion.article
			className="hover:bg-muted/50 relative flex items-start gap-x-3 border-b px-4 py-3 transition-colors"
			onClick={(e) => {
				const target = e.target as HTMLElement;
				if (target.closest("button, a, [role='menu'], [role='dialog'], [role='overlay']")) return;
				router.push(`/${data.user.username}/status/${data.id}`);
			}}
			{...props}
		>
			<Avatar src={data.user.avatarUrl} href={data.user.username} />
			<div className="w-full">
				<div className="flex items-start gap-x-1">
					<Name href={data.user.username}>{data.user.name}</Name>
					<Username href={data.user.username}>{data.user.username}</Username>
					<span className="text-muted-foreground">·</span>
					<span className="text-muted-foreground cursor-default">{getTweetDate(data.createdAt)}</span>
					<PostOptions className="ml-auto" user={data.user} postId={data.id} />
				</div>
				<p className="mt-1 break-words whitespace-pre-line">{data.content}</p>
				<div className="mt-1.5 flex w-full items-center justify-between">
					<CommentButton />
					<RepostButton
						isRepost={data.isReposted}
						reposts={data.reposts}
						postId={data.id}
						username={data.user.username}
					/>
					<LikeButton isLiked={data.isLiked} likes={data.likes} postId={data.id} username={data.user.username} />
					<BookmarkButton isBookmarked={data.isBookmarked} postId={data.id} />
					<ShareButton tweetUrl={`/${data.user.username}/status/${data.id}`} />
				</div>
			</div>
		</motion.article>
	);
}
