"use client";

import { cn } from "@/lib/utils";
import { useFollowerInfo, useFollowerMutation } from "@/hooks/use-follow";
import { type FollowerInfo } from "@/types/user";
import { Button, type ButtonProps } from "@/components/ui/button";

interface FollowButtonProps extends ButtonProps {
	initialState: FollowerInfo;
	userId: string;
}

export function FollowButton({ initialState, userId, size = "sm", className, ...props }: FollowButtonProps) {
	const { data } = useFollowerInfo(userId, initialState);
	const mutate = useFollowerMutation(userId, data.isFollowedByUser);

	const isFollowing = data.isFollowedByUser;

	return (
		<Button
			size={size}
			onClick={() => mutate()}
			variant={isFollowing ? "outline" : "default"}
			data-size={size}
			className={cn(
				isFollowing &&
					"group/follow hover:border-destructive/70 hover:text-destructive hover:bg-destructive/10 min-w-26 transition-all data-[size=sm]:min-w-23.5",
				className
			)}
			{...props}
		>
			{isFollowing ? (
				<span className="after:content-['Following'] group-hover/follow:after:content-['Unfollow']" />
			) : (
				"Follow"
			)}
		</Button>
	);
}
