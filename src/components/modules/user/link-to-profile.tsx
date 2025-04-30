import NextLink from "next/link";
import { Slot } from "@radix-ui/react-slot";

import { type User } from "@/types/user";

interface LinkProps extends React.ComponentProps<typeof Slot> {
	link?: User["username"] | false;
}

export function LinkToProfile({ link = false, children, ...props }: LinkProps) {
	return (
		<Slot {...props}>{link ? <NextLink href={`/users/${link}/`}>{children}</NextLink> : <div>{children}</div>}</Slot>
	);
}
