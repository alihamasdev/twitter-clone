import { cn } from "@/lib/utils";
import { LinkToProfile } from "./link-to-profile";

import { type User } from "@/types/user";

interface UsernameProps extends React.ComponentProps<"div"> {
	user: User | null;
	hasLink?: boolean;
}

function Username({ user, hasLink, className, ...props }: UsernameProps) {
	if (!user) return;

	return (
		<LinkToProfile
			username={user.username}
			hasLink={hasLink}
			className={cn("text-muted-foreground text-base font-medium", className)}
			{...props}
		>
			{`@${user.username}`}
		</LinkToProfile>
	);
}

export { Username };
