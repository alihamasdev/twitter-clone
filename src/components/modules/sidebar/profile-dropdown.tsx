"use client";

import { type User } from "@/types/user";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Avatar, AvatarImage, Name, Username } from "@/components/modules/user";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem
} from "@/components/ui/dropdown-menu";

export default function ProfileDropdown({ user }: { user: User }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size={null} variant="ghost" className="mt-auto p-3 xl:w-full xl:justify-start">
					<Avatar link={user.username}>
						<AvatarImage src={user.avatar} />
					</Avatar>
					<div className="hidden xl:contents">
						<div className="flex flex-col items-start">
							<Name name={user.name} verified={user.verified} />
							<Username username={user.username} />
						</div>
						<div className="ml-auto">
							<Icon id="ellipsis" className="fill-muted-foreground size-4.5" />
						</div>
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="min-w-70">
				<div className="hover:bg-muted flex cursor-pointer items-center gap-x-3 border-b px-4 py-3 transition-colors">
					<Avatar link={user.username}>
						<AvatarImage src={user.avatar} />
					</Avatar>
					<div>
						<Name name={user.name} verified={user.verified} />
						<Username username={user.username} />
					</div>
				</div>
				<DropdownMenuItem disabled>Add an existing account</DropdownMenuItem>
				<DropdownMenuItem variant="destructive" pushUrl="/logout">
					Log out of {`@${user.username}`}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
