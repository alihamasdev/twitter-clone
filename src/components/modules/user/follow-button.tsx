"use client";

import { type User } from "@/types/user";

import { Button } from "@/components/ui/button";

interface FollowButtonProps extends React.ComponentProps<typeof Button> {
	user: User;
}

export function FollowButton({ size = "sm", ...props }: FollowButtonProps) {
	return (
		<Button size={size} {...props}>
			Follow
		</Button>
	);
}
