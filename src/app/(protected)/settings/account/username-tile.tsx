"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { useAuth } from "@/context/auth-context";

export function UsernameTile() {
	const { user } = useAuth();

	return (
		<Link
			href="account/username"
			className="px-4 py-3 flex items-center justify-between transition-colors hover:bg-muted/50"
		>
			<div>
				<p>Username</p>
				<span className="text-muted-foreground text-sm font-normal">{user.username}</span>
			</div>
			<ChevronRight className="text-muted-foreground size-5" />
		</Link>
	);
}
