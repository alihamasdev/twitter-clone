import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ComponentProps extends React.ComponentProps<typeof Slot> {
	url: string | null;
}

function LinkToProfile({ url, children, ...props }: ComponentProps) {
	return <Slot {...props}>{url ? <Link href={`/users/${url}`}>{children}</Link> : <div>{children}</div>}</Slot>;
}

function Name({ url, className, ...props }: ComponentProps) {
	return (
		<LinkToProfile
			url={url}
			className={cn(
				"text-foreground block font-bold line-clamp-1",
				url && "hover:underline hover:underline-offset-2",
				className
			)}
			{...props}
		/>
	);
}

function Username({ url, className, ...props }: ComponentProps) {
	return <LinkToProfile url={url} className={cn("text-muted-foreground block line-clamp-1", className)} {...props} />;
}

interface UserAvatarProps extends React.ComponentProps<typeof Avatar> {
	src: string | Blob;
	url: ComponentProps["url"];
}

function UserAvatar({ src, url, ...props }: UserAvatarProps) {
	return (
		<Avatar asChild {...props}>
			<LinkToProfile url={url}>
				<AvatarImage src={src} />
				<AvatarFallback />
			</LinkToProfile>
		</Avatar>
	);
}

export { UserAvatar as Avatar, Name, Username };
