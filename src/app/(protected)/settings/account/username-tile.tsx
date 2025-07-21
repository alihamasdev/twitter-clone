"use client";

import { ChevronRight } from "lucide-react";

import { useAuth } from "@/context/auth-context";
import { Link } from "@/components/link";

export function UsernameTile() {
	const { user } = useAuth();

	return (
		<Link
			href="account/username"
			className="hover:bg-muted/50 flex items-center justify-between px-4 py-3 transition-colors"
		>
			<div>
				<p>Username</p>
				<span className="text-muted-foreground text-sm font-normal">{user.username}</span>
			</div>
			<ChevronRight className="text-muted-foreground size-5" />
		</Link>
	);
}
