import Link from "next/link";

import { Icon } from "@/components/ui/icon";

import { MoreLinksDropdown } from "./more-links-dropdown";
import { PostDialog } from "./post-dialog";
import { SidebarLinks } from "./sidebar-links";

export function Sidebar() {
	return (
		<header className="sticky top-0 hidden h-dvh max-w-65 min-w-20 overflow-y-auto px-1 py-4 sm:flex sm:flex-col sm:items-center xl:w-full xl:items-start">
			<Link href="/home" className="hover:bg-muted inline rounded-full p-3 transition-colors">
				<Icon id="twitter" className="size-6.5 xl:size-8" />
			</Link>

			<nav className="flex flex-col xl:w-full">
				<SidebarLinks />
				<MoreLinksDropdown />
			</nav>

			<PostDialog />
			{/* Profile Dropdown Component */}
		</header>
	);
}
