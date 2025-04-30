import { cn } from "@/lib/utils";
import { LinkToProfile } from "./link-to-profile";

import { type User } from "@/types/user";

interface UsernameProps extends React.ComponentProps<"div"> {
	username: User["username"];
	link?: boolean;
}

function Username({ username, link = false, className, ...props }: UsernameProps) {
	return (
		<LinkToProfile
			link={link ? username : false}
			className={cn("text-muted-foreground text-base font-medium", className)}
			{...props}
		>
			{`@${username}`}
		</LinkToProfile>
	);
}

export { Username };
