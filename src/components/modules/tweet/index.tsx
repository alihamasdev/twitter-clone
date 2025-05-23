"use client";

import { useRouter } from "next/navigation";

import { type TweetData } from "@/types/tweet";
import { type User } from "@/types/user";
import { cn, getFullDate, getTweetDate } from "@/lib/utils";

import { Avatar, AvatarImage, Name, Username } from "@/components/modules/user";

import { TweetImages } from "./tweet-images";

interface TweetProps extends React.ComponentProps<"article"> {
	user: User;
	tweetData: TweetData;
	isCurrentUserAuthor: boolean;
	isFollowing: boolean;
}

export function Tweet({ tweetData, user, isCurrentUserAuthor, isFollowing, className, ...props }: TweetProps) {
	const router = useRouter();

	return (
		<article
			className={cn("px-4 py-3 border-b hover:bg-muted/50 transition-colors flex items-start gap-x-3", className)}
			onClick={(e) => {
				const target = e.target as HTMLElement;
				if (target.closest("button, a, [role='menu'], img, [data-slot='image-dialog-overlay']")) return;
				router.push(`/tweets/${tweetData.id}/`);
			}}
			{...props}
		>
			<Avatar link={user.username}>
				<AvatarImage src={user.avatar} />
			</Avatar>
			<div className="flex flex-col w-full gap-y-2">
				<div className="flex items-center gap-x-1 w-full">
					<Name name={user.name} verified={user.verified} link={user.username} />
					<Username username={user.username} link />
					<span className="text-muted-foreground">·</span>
					<p
						className="text-muted-foreground hover:underline cursor-pointer"
						aria-label={getFullDate(tweetData.created_at)}
					>
						{getTweetDate(tweetData.created_at)}
					</p>
				</div>
				{tweetData.tweet_text && <p className="">{tweetData.tweet_text}</p>}
				<TweetImages images={tweetData.tweet_images} />
			</div>
		</article>
	);
}
