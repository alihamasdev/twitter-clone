"use client";

import { Fragment } from "react";
import Form from "next/form";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { isEqual } from "lodash";
import { CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { Avatar, Name, Username } from "@/components/user";

import { getSidebarLinks } from "./sidebar-links";

export function Sidebar() {
	const path = usePathname();
	const router = useRouter();
	const { user } = useAuth();

	const sidebarLinks = getSidebarLinks(user.username);

	return (
		<Fragment>
			<nav className="xl:w-full flex flex-col items-center">
				<Link href="/home" className="hover:bg-muted flex-center rounded-full p-3 transition-colors xl:self-start">
					<Icon id="twitter" className="size-6.5 xl:size-8" />
				</Link>
				{sidebarLinks.map(({ url, name, icon, activeIcon, disabled }) => {
					const isActive = isEqual(path, url);
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
					<DropdownMenuContent side="top" align="start" className="min-w-70 *:text-lg">
						<DropdownMenuItem asChild>
							<Link href="https://alihamas.vercel.app" target="_blank" passHref>
								<Icon id="arrow-top-right" className="size-6" />
								Developer Portfolio
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem pushUrl="/settings/display">
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
						<Avatar src={user.avatarUrl} url={null} />
						<div className="hidden xl:contents">
							<div className="flex flex-col items-start">
								<Name url={null}>{user.name}</Name>
								<Username url={null}>{user.username}</Username>
							</div>
							<Icon id="ellipsis" className="fill-muted-foreground size-4.5 ml-auto" />
						</div>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start" className="min-w-70">
					<DropdownMenuItem className="border-b" pushUrl={user.username}>
						<div className="flex gap-x-3 items-center w-full">
							<Avatar src={user.avatarUrl} url={null} />
							<div className="flex flex-col items-start">
								<Name url={null}>{user.name}</Name>
								<Username url={null}>{user.username}</Username>
							</div>
							<CheckCircle2 width={18} height={18} className="fill-green ml-auto" />
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem disabled>Add an existing account</DropdownMenuItem>
					<Form action={`/api/auth/logout`}>
						<DropdownMenuItem variant="destructive" className="w-full" asChild>
							<button type="submit">{`Log out of @${user.username}`}</button>
						</DropdownMenuItem>
					</Form>
				</DropdownMenuContent>
			</DropdownMenu>
		</Fragment>
	);
}
