import { IconId } from "@/components/ui/icon";

export interface SidebarLinks {
	name: string;
	url: string;
	icon: IconId;
	activeIcon: IconId;
	disabled?: boolean;
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
