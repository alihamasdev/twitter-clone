"use client";

import { Fragment } from "react";
import { useParams } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Header, HeaderTitle } from "@/components/layout/header";

export default function NotFound() {
	const { username } = useParams<{ username: string }>();

	return (
		<Fragment>
			<Header>
				<HeaderTitle>Profile</HeaderTitle>
			</Header>
			<section className="relative w-full">
				<div className="bg-image aspect-header border-b" />
				<Avatar className="bg-tooltip border-background absolute -bottom-12 left-4 size-25 cursor-default border-6 lg:-bottom-15 lg:size-33">
					<AvatarFallback />
				</Avatar>
			</section>
			<section className="px-4 py-3">
				<p className="text-foreground mt-12 line-clamp-1 block text-xl font-extrabold lg:mt-15">{`@${username}`}</p>
				<div className="mt-25 space-y-3">
					<h2 className="text-center text-3xl font-extrabold">This account doesn&apos;t exist</h2>
					<p className="text-muted-foreground text-center text-lg">Try searching for another.</p>
				</div>
			</section>
		</Fragment>
	);
}
