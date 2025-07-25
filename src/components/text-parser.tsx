import { LinkIt, LinkItUrl } from "react-linkify-it";

import { cn } from "@/lib/utils";
import { Link } from "@/components/link";

export function TextParser({ children, className }: { children?: string | null; className?: string }) {
	return (
		<div className={cn("break-words whitespace-pre-line", className)}>
			<LinkIt
				regex={/(@[a-zA-Z0-9_]+)/}
				component={(match, key) => (
					<Link href={match.slice(1)} key={key} className="text-accent hover:underline">
						{match}
					</Link>
				)}
			>
				<LinkItUrl className="text-accent hover:underline">{children}</LinkItUrl>
			</LinkIt>
		</div>
	);
}
