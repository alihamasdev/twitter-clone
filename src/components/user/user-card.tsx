"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import type { FollowerInfo, UserData } from "@/types/user";
import { Avatar, FollowButton, Name, Username } from "@/components/user";

interface UserCardProps extends React.ComponentProps<"div"> {
	user: UserData;
	follow?: FollowerInfo;
}

export function UserCard({ user, follow, className, ...props }: UserCardProps) {
	const router = useRouter();

	return (
		<div
			className={cn("hover:bg-muted/50 flex cursor-pointer items-start gap-x-3 px-4 py-3 transition-colors", className)}
			onClick={(e) => {
				const target = e.target as HTMLElement;
				if (target.closest("button, a")) return;
				router.push(`/${user.username}`);
			}}
			{...props}
		>
			<Avatar src={user.avatarUrl} href={user.username} />
			<div className="flex w-full items-center justify-between">
				<div>
					<Name href={user.username}>{user.name}</Name>
					<Username href={user.username}>{user.username}</Username>
				</div>
				{follow && <FollowButton userId={user.id} initialState={follow} />}
			</div>
		</div>
	);
}
