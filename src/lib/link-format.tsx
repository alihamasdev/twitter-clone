import { LinkIt, LinkItUrl } from "react-linkify-it";

import { cn } from "@/lib/utils";
import { Username } from "@/components/user";

function LinkifyUrl({ className, ...props }: React.ComponentProps<typeof LinkItUrl>) {
	return <LinkItUrl className={cn("text-accent underline-offset-3 hover:underline", className)} {...props} />;
}

function LinkifyUsername({ children }: React.ComponentProps<typeof LinkItUrl>) {
	return (
		<LinkIt
			regex={/(@[a-zA-Z0-9_]+)/}
			component={(match, index) => (
				<Username
					key={index}
					href={match.slice(1)}
					className="text-accent inline-block underline-offset-3 hover:underline"
				>
					{match}
				</Username>
			)}
		>
			{children}
		</LinkIt>
	);
}

export function LinkFormating({ children }: { children: React.ReactNode }) {
	return (
		<LinkifyUsername>
			<LinkifyUrl>{children}</LinkifyUrl>
		</LinkifyUsername>
	);
}
