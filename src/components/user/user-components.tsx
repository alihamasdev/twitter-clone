import { type LinkProps } from "next/link";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@/components/link";

function Name({ href, className, ...props }: React.ComponentProps<typeof Link>) {
	return (
		<Link
			href={`/${href}`}
			className={cn("text-foreground line-clamp-1 block font-bold hover:underline hover:underline-offset-2", className)}
			{...props}
		/>
	);
}

interface UsernameProps extends React.ComponentProps<typeof Link> {
	children: string;
}

function Username({ href, className, children, ...props }: UsernameProps) {
	return (
		<Link href={`/${href}`} className={cn("text-muted-foreground line-clamp-1 block", className)} {...props}>
			{`@${children}`}
		</Link>
	);
}

interface UserAvatarProps extends React.ComponentProps<typeof AvatarImage> {
	src: string | Blob;
	href: LinkProps["href"];
}

function UserAvatar({ src, href, className, ...props }: UserAvatarProps) {
	return (
		<Avatar asChild>
			<Link href={`/${href}`} className={className}>
				<AvatarImage src={src} {...props} />
				<AvatarFallback />
			</Link>
		</Avatar>
	);
}

export { UserAvatar as Avatar, Name, Username };
