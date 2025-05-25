"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";

import { cn } from "@/lib/utils";
import { Icon, type IconId } from "@/components/ui/icon";

type Links = {
	name: string;
	url: string;
	icon: IconId;
	activeIcon: IconId;
	disabled?: boolean;
};

export function SidebarLinks() {
	const path = usePathname();
	const { user } = useAuth();

	const links: Links[] = [
		{
			name: "Home",
			url: "/home",
			icon: "home",
			activeIcon: "home-solid"
		},
		{
			name: "Explore",
			url: "/explore",
			icon: "search",
			activeIcon: "search-solid",
			disabled: true
		},
		{
			name: "Notifications",
			url: "/notifications",
			icon: "notifications",
			activeIcon: "notifications-solid",
			disabled: true
		},
		{
			name: "Messages",
			url: "/messages",
			icon: "messages",
			activeIcon: "messages-solid",
			disabled: true
		},
		{
			name: "Communities",
			url: "/communities",
			icon: "communities",
			activeIcon: "communities-solid",
			disabled: true
		},
		{
			name: "Premium",
			url: "/premium",
			icon: "twitter",
			activeIcon: "twitter",
			disabled: true
		},
		{
			name: "Bookmarks",
			url: "/bookmarks",
			icon: "bookmarks",
			activeIcon: "bookmarks-solid"
		},
		{
			name: "Profile",
			url: `/users/${user.username}`,
			icon: "profile",
			activeIcon: "profile-solid"
		}
	];

	return links.map(({ url, name, icon, activeIcon, disabled }) => (
		<Link
			key={name}
			href={url}
			onClick={(e) => disabled && e.preventDefault()}
			className={cn("group/nav outline-none md:w-fit xl:w-full", disabled && "cursor-not-allowed opacity-90")}
		>
			<div className="group-hover/nav:bg-muted relative inline-flex items-center rounded-full p-3 transition-all duration-200">
				<Icon id={path.startsWith(url) ? activeIcon : icon} className="size-6.5" />
				<p className={cn("hidden px-4 text-xl font-medium xl:block", path.startsWith(url) && "font-extrabold")}>
					{name}
				</p>
			</div>
		</Link>
	));
}
