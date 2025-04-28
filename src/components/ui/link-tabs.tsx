"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LinkTabsProps extends React.ComponentProps<typeof Link> {}

export function LinkTabs({ href, className, children }: LinkTabsProps) {
	const path = usePathname();
	const isActive = path.endsWith(href.toString());

	return (
		<Link
			href={href}
			data-state={isActive && "active"}
			className={cn(
				"flex-center hover:bg-muted data-[state=active]:text-foreground text-muted-foreground relative h-13 cursor-pointer font-bold transition-colors",
				className
			)}
		>
			<span
				data-state={isActive && "active"}
				className="data-[state=active]:before:bg-accent relative leading-13 data-[state=active]:before:absolute data-[state=active]:before:bottom-0 data-[state=active]:before:h-1 data-[state=active]:before:w-full data-[state=active]:before:rounded-full"
			>
				{children}
			</span>
		</Link>
	);
}
