import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { LinkToProfile } from "./link-to-profile";

import { type User } from "@/types/user";

interface NameProps extends React.ComponentProps<"div"> {
	user: User | null;
	hasLink?: boolean;
}

function Name({ user, hasLink, className, ...props }: NameProps) {
	if (!user) return;

	return (
		<LinkToProfile
			username={user.username}
			hasLink={hasLink}
			className={cn("flex items-center gap-x-0.5", className)}
			{...props}
		>
			<p className={cn("text-foreground text-base font-bold underline-offset-4", hasLink && "hover:underline")}>
				{user.name}
			</p>
			{user.verified && <Icon id="verified" className="fill-blue size-4.5" />}
		</LinkToProfile>
	);
}

export { Name };
