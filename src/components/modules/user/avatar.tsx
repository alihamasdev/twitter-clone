import { type User } from "@/types/user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LinkToProfile } from "./link-to-profile";

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
