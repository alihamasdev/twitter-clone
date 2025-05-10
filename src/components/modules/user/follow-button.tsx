import { Button } from "@/components/ui/button";

interface FollowButtonProps extends React.ComponentProps<typeof Button> {
	isFollowing: boolean;
}

export function FollowButton({ isFollowing, size, ...props }: FollowButtonProps) {
	if (isFollowing) {
		return (
			<Button
				data-size={size}
				size={size}
				variant="outline"
				className="group/follow hover:border-destructive/70 hover:text-destructive hover:bg-destructive/10 min-w-26 transition-all data-[size=sm]:min-w-23.5"
				{...props}
			>
				<span className="after:content-['Following'] group-hover/follow:after:content-['Unfollow']" />
			</Button>
		);
	}

	return (
		<Button size={size} {...props}>
			Follow
		</Button>
	);
}
