"use client";
import { useRouter } from "next/navigation";

import { type User } from "@/types/user";
import { profilePage } from "@/utils/contants";

import { Avatar, Name, Username, FollowButton } from "@/components/modules/user";

export function UserCard({ user }: { user: User }) {
	const router = useRouter();

	return (
		<div
			className="hover:bg-muted/50 flex cursor-pointer items-center gap-x-3 px-4 py-3 transition-colors"
			onClick={(e) => {
				const target = e.target as HTMLElement;
				if (target.closest("button, a")) return;

				router.push(profilePage + user.username);
			}}
		>
			<Avatar user={user} />
			<div>
				<Name user={user} />
				<Username user={user} />
			</div>
			<FollowButton user={user} className="ml-auto" />
		</div>
	);
}
