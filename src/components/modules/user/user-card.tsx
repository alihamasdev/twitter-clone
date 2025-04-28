"use client";
import { useRouter } from "next/navigation";

import { type User } from "@/types/user";
import { type Tables } from "@/types/supabase";
import { profilePage } from "@/utils/contants";

import { cn } from "@/lib/utils";
import { Avatar, Name, Username } from "@/components/modules/user";

interface UserCardProps extends React.ComponentProps<"div"> {
	user: User & { bio?: Tables<"profiles">["bio"] };
}

export function UserCard({ user: { bio, ...user }, className, children, ...props }: UserCardProps) {
	const router = useRouter();

	return (
		<div
			className={cn("hover:bg-muted/50 flex cursor-pointer items-start gap-x-3 px-4 py-3 transition-colors", className)}
			onClick={(e) => {
				const target = e.target as HTMLElement;
				if (target.closest("button, a")) return;
				router.push(profilePage + user.username);
			}}
			{...props}
		>
			<Avatar user={user} />
			<div className="w-full">
				<div className="flex w-full items-center justify-between">
					<div>
						<Name user={user} />
						<Username user={user} />
					</div>
					{children}
				</div>
				{bio && <p className="mt-1 text-base">{bio}</p>}
			</div>
		</div>
	);
}
