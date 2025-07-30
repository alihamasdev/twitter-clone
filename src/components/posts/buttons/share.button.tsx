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
			<DropdownMenuTrigger
				aria-label="share post"
				className="flex-center hover:bg-blue/10 group size-8 cursor-pointer rounded-full"
			>
				<Icon id="share" className="fill-muted-foreground group-hover:fill-blue size-4.5" />
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
