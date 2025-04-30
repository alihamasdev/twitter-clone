import NextLink from "next/link";
import { Slot } from "@radix-ui/react-slot";

import { type User } from "@/types/user";

interface LinkProps extends React.ComponentProps<typeof Slot>, Pick<User, "username"> {
	hasLink?: boolean;
}

export function LinkToProfile({ username, hasLink, children, ...props }: LinkProps) {
	return (
		<Slot {...props}>
			{hasLink ? <NextLink href={`/users/${username}/`}>{children}</NextLink> : <div>{children}</div>}
		</Slot>
	);
}
