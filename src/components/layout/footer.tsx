"use client";

import { usePathname } from "next/navigation";

import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/auth-context";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/link";

import { getSidebarLinks } from "./sidebar-links";

export function MobileFooter() {
	const isMobile = useIsMobile();
	const path = usePathname();
	const { user } = useAuth();

	const sidebarLinks = getSidebarLinks(user.username);

	if (!isMobile) return;

	return (
		<footer className="bg-background/75 sticky bottom-0 z-10 mt-auto flex items-center justify-evenly border-t py-2 backdrop-blur-md">
			{sidebarLinks.map(({ url, name, icon, activeIcon }) => {
				const isActive = path.startsWith(url);
				return (
					<Link key={name} href={url} aria-label={`Go to ${name} page`} className="group/nav w-fit outline-none">
						<div className="group-hover/nav:bg-muted inline-flex items-center rounded-full p-2 transition-colors">
							<Icon id={isActive ? activeIcon : icon} className="size-5" />
						</div>
					</Link>
				);
			})}
		</footer>
	);
}
