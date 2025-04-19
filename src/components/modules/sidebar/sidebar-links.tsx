"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icon, type IconId } from "@/components/ui/icon";

type Links = {
	name: string;
	link: string;
	icon: IconId;
	activeIcon: IconId;
	disabled?: boolean;
};

export function SidebarLinks() {
	const path = usePathname();

	const links: Links[] = [
		{
			name: "Home",
			link: "/home",
			icon: "home",
			activeIcon: "home-solid"
		},
		{
			name: "Explore",
			link: "/explore",
			icon: "search",
			activeIcon: "search-solid",
			disabled: true
		},
		{
			name: "Notifications",
			link: "/notifications",
			icon: "notifications",
			activeIcon: "notifications-solid",
			disabled: true
		},
		{
			name: "Messages",
			link: "/messages",
			icon: "messages",
			activeIcon: "messages-solid",
			disabled: true
		},
		{
			name: "Communities",
			link: "/communities",
			icon: "communities",
			activeIcon: "communities-solid",
			disabled: true
		},
		{
			name: "Premium",
			link: "/premium",
			icon: "twitter",
			activeIcon: "twitter",
			disabled: true
		},
		{
			name: "Bookmarks",
			link: "/bookmarks",
			icon: "bookmarks",
			activeIcon: "bookmarks-solid"
		},
		{
			name: "Profile",
			link: `/users/user_01`,
			icon: "profile",
			activeIcon: "profile-solid"
		}
	];

	return links.map(({ link, name, icon, activeIcon, disabled }) => (
		<Link
			key={name}
			href={link}
			onClick={(e) => disabled && e.preventDefault()}
			className={cn("group/nav outline-none md:w-fit xl:w-full", disabled && "cursor-not-allowed opacity-90")}
		>
			<div className="group-hover/nav:bg-muted relative inline-flex items-center rounded-full p-3 transition-all duration-200">
				<Icon id={path === link ? activeIcon : icon} className="size-6.5" />
				<p className={cn("hidden px-4 text-xl font-normal xl:block", path === link && "font-bold")}>{name}</p>
			</div>
		</Link>
	));
}
