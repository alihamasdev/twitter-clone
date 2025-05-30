"use client";

import { Fragment } from "react";
import { useParams } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Header, HeaderTitle } from "@/components/layout/header";
import { Name } from "@/components/user";

export default function NotFound() {
	const { username } = useParams<{ username: string }>();

	return (
		<Fragment>
			<Header>
				<HeaderTitle>Profile</HeaderTitle>
			</Header>
			<section className="relative w-full">
				<div className="bg-image aspect-header border-b" />
				<Avatar className="bg-tooltip absolute -bottom-12 left-4 size-25 border-6 border-background lg:-bottom-15 lg:size-33 cursor-default">
					<AvatarFallback />
				</Avatar>
			</section>
			<section className="px-4 py-3">
				<Name url={null} className="mt-12 lg:mt-15 text-xl font-extrabold">{`@${username}`}</Name>
				<div className="mt-25 space-y-3">
					<h2 className="text-3xl font-extrabold text-center">This account doesn&apos;t exist</h2>
					<p className="text-lg text-muted-foreground text-center">Try searching for another.</p>
				</div>
			</section>
		</Fragment>
	);
}
