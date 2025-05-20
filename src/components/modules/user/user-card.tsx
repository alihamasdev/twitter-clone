"use client";

import { useRouter } from "next/navigation";

import { User } from "@/types/user";
import { cn } from "@/lib/utils";

import { Avatar, AvatarImage, Name, Username } from "@/components/modules/user";

interface UserCardProps extends React.ComponentProps<"div"> {
	user: User;
}

export function UserCard({ user, className, children, ...props }: UserCardProps) {
	const router = useRouter();

	return (
		<div
			className={cn("hover:bg-muted/50 flex cursor-pointer items-start gap-x-3 px-4 py-3 transition-colors", className)}
			onClick={(e) => {
				const target = e.target as HTMLElement;
				if (target.closest("button, a")) return;
				router.push(`/users/${user.username}/`);
			}}
			{...props}
		>
			<Avatar link={user.username}>
				<AvatarImage src={user.avatar} />
			</Avatar>
			<div className="w-full">
				<div className="flex w-full items-center justify-between">
					<div>
						<Name name={user.name} verified={user.verified} link={user.username} />
						<Username username={user.username} link />
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}
