"use client";

import { useAuth } from "@/context/auth-context";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { Avatar, AvatarImage, Name, UserCard, Username } from "@/components/modules/user";

export default function ProfileDropdown() {
	const { user } = useAuth();
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
				<DropdownMenuItem asChild>
					<UserCard user={user} className="border-b" isFollowing={null} onClick={undefined} />
				</DropdownMenuItem>
				<DropdownMenuItem disabled>Add an existing account</DropdownMenuItem>
				<DropdownMenuItem variant="destructive" pushUrl="/logout">
					Log out of {`@${user.username}`}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
