import { type User } from "@/types/user";

import { LinkToProfile } from "./link-to-profile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps extends Omit<React.ComponentProps<typeof Avatar>, "asChild"> {
	link?: User["username"] | false;
}

export function UserAvatar({ link = false, children, ...props }: UserAvatarProps) {
	return (
		<Avatar asChild {...props}>
			<LinkToProfile link={link}>
				{children}
				<AvatarFallback />
			</LinkToProfile>
		</Avatar>
	);
}

export { UserAvatar as Avatar, AvatarImage };
