import { Fragment } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Icon, type IconId } from "@/components/ui/icon";
import { Header, HeaderTitle } from "@/components/layout/header";

interface SettingsTiles {
	title: string;
	description: string;
	url: string;
	icon: IconId;
}

const settingsTiles = [
	{
		title: "Account information",
		description: "See your account information like your username, phone number and email address.",
		url: "/settings/account",
		icon: "profile"
	},
	{
		title: "Display",
		description: "Manage your color, and background. These settings affect all the X accounts on this browser.",
		url: "/settings/display",
		icon: "display"
	}
] satisfies SettingsTiles[];

export default function SettingsPage() {
	return (
		<Fragment>
			<Header>
				<HeaderTitle>Settings</HeaderTitle>
			</Header>
			{settingsTiles.map(({ title, description, icon, url }) => (
				<Link
					href={url}
					key={title}
					className="px-4 py-3 transition-colors hover:bg-muted/50 flex gap-x-4 items-center"
				>
					<Icon id={icon} className="size-6 fill-muted-foreground" />
					<div className="w-full space-y-0.5">
						<h3 className="text-foreground">{title}</h3>
						<p className="text-muted-foreground text-sm/4 font-normal">{description}</p>
					</div>
					<ChevronRight className="text-muted-foreground size-5" />
				</Link>
			))}
		</Fragment>
	);
}
