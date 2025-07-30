import { IconId } from "@/components/ui/icon";

export interface SidebarLinks {
	name: string;
	url: string;
	icon: IconId;
	activeIcon: IconId;
}

export function getSidebarLinks(username: string) {
	const links: SidebarLinks[] = [
		{
			name: "Home",
			url: "/home",
			icon: "home",
			activeIcon: "home-solid"
		},
		{
			name: "Bookmarks",
			url: "/bookmarks",
			icon: "bookmarks",
			activeIcon: "bookmarks-solid"
		},
		{
			name: "Profile",
			url: `/${username}`,
			icon: "profile",
			activeIcon: "profile-solid"
		}
	];

	return links;
}

export interface MoreSidebarLinks {
	icon: IconId;
	name: string;
	url: string;
}

export const moreSidebarLinks: MoreSidebarLinks[] = [
	{
		icon: "arrow-top-right",
		name: "Developer Portfolio",
		url: "https://alihamas.vercel.app"
	},
	{
		icon: "display",
		name: "Display",
		url: "/settings/display"
	},
	{
		icon: "settings",
		name: "Settings and Privacy",
		url: "/settings"
	}
];
