"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

import { axios } from "@/lib/axios";
import { getTweetDate } from "@/lib/date";
import { LinkFormating } from "@/lib/link-format";
import { type PostData } from "@/types/post";
import { Avatar, Name, Username } from "@/components/user";

import { BookmarkButton } from "./buttons/bookmark.button";
import { CommentButton } from "./buttons/comment-button";
import { LikeButton } from "./buttons/like.button";
import { RepostButton } from "./buttons/repost.button";
import { ShareButton } from "./buttons/share.button";
import { PostOptions } from "./post-options";

export function Post({ post, ...props }: React.ComponentProps<typeof motion.article> & { post: PostData }) {
	const router = useRouter();
	const { data } = useQuery({
		queryKey: [`post`, post.id],
		queryFn: () => axios.get<PostData>(`/api/posts/${post.id}`).then((res) => res.data),
		staleTime: Infinity,
		initialData: post
	});

	return (
		<motion.article
			className="px-4 py-3 transition-colors flex items-start gap-x-3 hover:bg-muted/50 border-b relative"
			onClick={(e) => {
				const target = e.target as HTMLElement;
				if (target.closest("button, a, [role='menu']")) return;
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
				<p className="whitespace-pre-line break-words mt-1">
					<LinkFormating>{data.content}</LinkFormating>
				</p>
				<div className="flex items-center justify-between w-full mt-1.5">
					<CommentButton />
					<RepostButton isRepost={data.isReposted} reposts={data.reposts} postId={data.id} />
					<LikeButton isLiked={data.isLiked} likes={data.likes} postId={data.id} />
					<BookmarkButton isBookmarked={data.isBookmarked} postId={data.id} />
					<ShareButton tweetUrl={`/${data.user.username}/status/${data.id}`} />
				</div>
			</div>
		</motion.article>
	);
}
