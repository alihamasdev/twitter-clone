"use client";

import { Button } from "@/components/ui/button";

interface FollowButtonProps extends React.ComponentProps<typeof Button> {
	isFollowing?: boolean;
}

export function FollowButton({ isFollowing, size = "sm", ...props }: FollowButtonProps) {
	if (isFollowing) {
		return (
			<Button size={size} variant="outline" {...props}>
				Following
			</Button>
		);
	}

	return (
		<Button size={size} {...props}>
			Follow
		</Button>
	);
}
