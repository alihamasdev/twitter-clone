import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem
} from "@/components/ui/dropdown-menu";

export function MoreLinksDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="group/nav flex cursor-pointer justify-start outline-none md:w-fit xl:w-full">
				<div className="group-hover/nav:bg-muted relative inline-flex items-center rounded-full p-3 transition-all duration-200">
					<Icon id="ellipsis-circle" className="size-6.5" />
					<p className="hidden px-4 text-xl font-normal xl:block">More</p>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="top" align="start" className="min-w-70 *:text-lg">
				<DropdownMenuItem asChild>
					<a href="https://alihamas.vercel.app" target="_blank" rel="noopener noreferrer">
						<Icon id="arrow-top-right" className="size-6" />
						Portfolio
					</a>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Icon id="display" className="size-6" />
					Display
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/settings">
						<Icon id="settings" className="size-6" />
						Settings and Privacy
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
