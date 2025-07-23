"use client";

import { Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/link";

import { getSidebarLinks, moreSidebarLinks } from "./sidebar-links";

export function Sidebar() {
	const path = usePathname();
	const router = useRouter();
	const { user } = useAuth();

	const sidebarLinks = getSidebarLinks(user.username);

	const handleLogout = async () => {
		const supabase = createClient();
		await supabase.auth.signOut();
		router.push("/auth");
	};

	return (
		<Fragment>
			<nav className="flex flex-col items-center xl:w-full">
				<Link href="/home" className="hover:bg-muted flex-center rounded-full p-3 transition-colors xl:self-start">
					<Icon id="twitter" className="size-6.5 xl:size-8" />
				</Link>
				{sidebarLinks.map(({ url, name, icon, activeIcon, disabled }) => {
					const isActive = path === url;
					return (
						<Link
							key={name}
							href={url}
							onClick={(e) => disabled && e.preventDefault()}
							className={cn("group/nav outline-none md:w-fit xl:w-full", disabled && "cursor-not-allowed opacity-90")}
						>
							<div className="group-hover/nav:bg-muted inline-flex items-center rounded-full p-3 transition-colors">
								<Icon id={isActive ? activeIcon : icon} className="size-6.5" />
								<p className={cn("hidden px-4 text-xl font-medium xl:block", isActive && "font-extrabold")}>{name}</p>
							</div>
						</Link>
					);
				})}
				<DropdownMenu>
					<DropdownMenuTrigger className="group/nav flex cursor-pointer justify-start outline-none md:w-fit xl:w-full">
						<div className="group-hover/nav:bg-muted inline-flex items-center rounded-full p-3 transition-colors">
							<Icon id="ellipsis-circle" className="size-6.5" />
							<p className="hidden px-4 text-xl font-medium xl:block">More</p>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent side="top" align="start" className="min-w-70">
						{moreSidebarLinks.map(({ icon, name, url }) => (
							<DropdownMenuItem key={name} asChild>
								<Link href={url} target={url.startsWith("https://") ? "_blank" : "_self"}>
									<Icon id={icon} className="size-6" />
									<span className="text-lg">{name}</span>
								</Link>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</nav>

			<Button
				size={null}
				onClick={() => router.push("/compose/post")}
				className="my-5 min-h-13 min-w-13 text-lg xl:w-full xl:px-6"
			>
				<Icon id="post" className="fill-primary-foreground size-6 xl:hidden" />
				<span className="hidden xl:block">Post</span>
			</Button>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size={null} variant="ghost" className="mt-auto p-3 xl:w-full xl:justify-start">
						<Avatar>
							<AvatarImage src={user.avatarUrl} />
							<AvatarFallback />
						</Avatar>
						<div className="hidden xl:contents">
							<div className="flex flex-col items-start">
								<p className="text-foreground line-clamp-1 block text-base">{user.name}</p>
								<p className="text-muted-foreground line-clamp-1 block text-base">{`@${user.username}`}</p>
							</div>
							<Icon id="ellipsis" className="fill-muted-foreground ml-auto size-4.5" />
						</div>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start" className="min-w-70">
					<DropdownMenuItem disabled>Add an existing account</DropdownMenuItem>
					<DropdownMenuItem variant="destructive" className="w-full" onClick={handleLogout}>
						{`Log out of @${user.username}`}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Fragment>
	);
}
