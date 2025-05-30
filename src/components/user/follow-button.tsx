"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useFollowerInfo, useFollowerMutation } from "@/hooks/use-follow";
import { useAuth } from "@/context/auth-context";
import { type FollowerInfo } from "@/types/user";
import { Button, type ButtonProps } from "@/components/ui/button";

interface FollowButtonProps extends ButtonProps {
	initialState: FollowerInfo;
	userId: string;
}

export function FollowButton({ initialState, userId, size = "sm", className, ...props }: FollowButtonProps) {
	const { user } = useAuth();
	const router = useRouter();
	const { data } = useFollowerInfo(userId, initialState);
	const mutate = useFollowerMutation(userId, data.isFollowedByUser);

	if (userId === user.id) {
		return (
			<Button variant="outline" onClick={() => router.push(`/settings/profile`)}>
				Edit Profile
			</Button>
		);
	}

	return (
		<Button
			size={size}
			onClick={() => mutate()}
			variant={data.isFollowedByUser ? "outline" : "default"}
			data-size={size}
			className={cn(
				data.isFollowedByUser &&
					"group/follow hover:border-destructive/70 hover:text-destructive hover:bg-destructive/10 min-w-26 transition-all data-[size=sm]:min-w-23.5",
				className
			)}
			{...props}
		>
			{data.isFollowedByUser ? (
				<span className="after:content-['Following'] group-hover/follow:after:content-['Unfollow']" />
			) : (
				"Follow"
			)}
		</Button>
	);
}
