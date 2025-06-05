"use client";

import { copyToClipboard, webShare } from "@/utils/navigator.helpers";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItemIcon,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";

interface ShareButtonProps {
	tweetUrl: string;
}

export function ShareButton({ tweetUrl }: ShareButtonProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="size-8 flex-center rounded-full hover:bg-blue/10 group cursor-pointer">
				<Icon id="share" className="size-4.5 fill-muted-foreground group-hover:fill-blue" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItemIcon icon="copy" onClick={() => copyToClipboard(tweetUrl)}>
					Copy link
				</DropdownMenuItemIcon>
				<DropdownMenuItemIcon icon="share" onClick={() => webShare(tweetUrl)}>
					Share post via ...
				</DropdownMenuItemIcon>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
