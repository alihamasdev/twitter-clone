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
	const { data } = useFollowerInfo(userId, initialState);
	const { mutate } = useFollowerMutation(userId, data.isFollowedByUser);

	if (userId === user.id) {
		return <EditProfileButton />;
	}

	return (
		<Button
			size={size}
			data-size={size}
			onClick={() => mutate()}
			aria-label={`${data.isFollowedByUser ? "unfollow" : "follow"} user`}
			variant={data.isFollowedByUser ? "outline" : "default"}
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

export function EditProfileButton() {
	const router = useRouter();

	return (
		<Button variant="outline" aria-label="edit profile" onClick={() => router.push(`/settings/profile`)}>
			Edit Profile
		</Button>
	);
}
