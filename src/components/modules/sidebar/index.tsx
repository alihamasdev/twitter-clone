import Link from "next/link";
import dynamic from "next/dynamic";

import { getUser } from "@/actions/auth/get-user";

import { Icon } from "@/components/ui/icon";
import { SidebarLinks } from "./sidebar-links";
import { MoreLinksDropdown } from "./more-links-dropdown";

const PostDialog = dynamic(() => import("./post-dialog"));
const ProfileDropdown = dynamic(() => import("./profile-dropdown"));

export async function Sidebar() {
	const user = await getUser();

	return (
		<header className="sticky top-0 hidden h-dvh max-w-65 min-w-20 overflow-y-auto px-1 py-4 sm:flex sm:flex-col sm:items-center xl:w-full xl:items-start">
			<Link href="/home" className="hover:bg-muted inline rounded-full p-3 transition-colors">
				<Icon id="twitter" className="size-6.5 xl:size-8" />
			</Link>

			<nav className="flex flex-col xl:w-full">
				<SidebarLinks user={user} />
				<MoreLinksDropdown />
			</nav>

			<PostDialog />
			<ProfileDropdown user={user} />
		</header>
	);
}
