import { type User } from "@/types/user";

import { LinkToProfile } from "./link-to-profile";
import { Avatar as RedixAvatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function getInitials(name: string) {
	const names = name.trim().split(" ");
	return names.length > 1 ? `${names[0][0]}${names[names.length - 1][0]}` : names[0].slice(0, 2);
}

interface AvatarProps extends Omit<React.ComponentProps<typeof RedixAvatar>, "asChild"> {
	user: User | null;
	hasLink?: boolean;
	imageProps?: React.ComponentProps<typeof AvatarImage>;
	fallbackProps?: React.ComponentProps<typeof AvatarFallback>;
}

export function Avatar({ user, hasLink, imageProps, fallbackProps, ...props }: AvatarProps) {
	if (!user) return <RedixAvatar {...props} />;

	return (
		<RedixAvatar asChild {...props}>
			<LinkToProfile username={user.username} hasLink={hasLink}>
				<AvatarImage src={user.avatar} alt={user.name} {...imageProps} />
				<AvatarFallback {...fallbackProps}>{getInitials(user.name)}</AvatarFallback>
			</LinkToProfile>
		</RedixAvatar>
	);
}
