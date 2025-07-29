"use client";

import { useRouter } from "next/navigation";
import { motion, type HTMLMotionProps } from "motion/react";

import { getTweetDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { usePost } from "@/hooks/use-post";
import { type PostData } from "@/types/post";
import { Link } from "@/components/link";
import { TextParser } from "@/components/text-parser";
import { Avatar, Name, Username } from "@/components/user";

import { BookmarkButton } from "./buttons/bookmark.button";
import { LikeButton } from "./buttons/like.button";
import { ReplyButton } from "./buttons/reply-button";
import { RepostButton } from "./buttons/repost.button";
import { ShareButton } from "./buttons/share.button";
import { PostOptions } from "./post-options";

interface PostProps extends HTMLMotionProps<"article"> {
	postId: string;
	postData: PostData;
	hasReplyPost?: boolean;
}

export function Post({ postId, postData, hasReplyPost, className, ...props }: PostProps) {
	const { push } = useRouter();
	const { data } = usePost(postId, postData);

	return (
		<motion.article
			className={cn(
				"hover:bg-muted/50 relative grid grid-cols-[40px_1fr] gap-x-3 border-b px-4 pt-3 pb-3 transition-colors",
				className
			)}
			onClick={(e) => {
				const target = e.target as HTMLElement;
				if (target.closest("button, a, [role='menu'], [role='dialog'], [role='overlay']")) return;
				push(`/${data.user.username}/status/${data.id}`);
			}}
			{...props}
		>
			<div className="flex h-full flex-col items-center">
				<Avatar src={data.user.avatarUrl} href={data.user.username} />
				{hasReplyPost && <div className="mt-1.5 h-full border-x" />}
			</div>
			<div className="w-full space-y-1">
				<div className="flex items-center gap-x-1">
					<Name href={data.user.username}>{data.user.name}</Name>
					<Username href={data.user.username}>{data.user.username}</Username>
					<span className="text-muted-foreground">·</span>
					<span className="text-muted-foreground cursor-default">{getTweetDate(data.createdAt)}</span>
					<PostOptions user={data.user} postId={data.id} parentId={data.parentId} />
				</div>
				{data.parent && (
					<p className="text-muted-foreground text-base">
						Replying to{" "}
						<Link href={`/${data.parent.user.username}`} className="text-accent underline-offset-2 hover:underline">
							{`@${data.parent.user.username}`}
						</Link>
					</p>
				)}
				<TextParser className="">{data.content}</TextParser>
				<div className={cn("flex w-full items-center justify-between", hasReplyPost && "pb-1.5")}>
					<ReplyButton postData={data} />
					<RepostButton isRepost={data.isReposted} reposts={data.reposts} postId={data.id} />
					<LikeButton isLiked={data.isLiked} likes={data.likes} postId={data.id} />
					<BookmarkButton isBookmarked={data.isBookmarked} postId={data.id} />
					<ShareButton tweetUrl={`/${data.user.username}/status/${data.id}`} />
				</div>
			</div>
		</motion.article>
	);
}
