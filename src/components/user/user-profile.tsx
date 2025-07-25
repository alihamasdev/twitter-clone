"use client";

import { Fragment } from "react";
import Image from "next/image";
import { format } from "date-fns";

import { useProfile } from "@/hooks/use-profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon, type IconId } from "@/components/ui/icon";
import { LinkTabs } from "@/components/ui/link-tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { BackButton, Header, HeaderDescription, HeaderTitle } from "@/components/layout/header";
import { Link } from "@/components/link";
import { TextParser } from "@/components/text-parser";
import { FollowButton } from "@/components/user";

import { FollowersCount, FollowingCount, PostsCount } from "./counts";

type ProfileMeta = {
	icon: IconId;
	data: string | null;
	link?: boolean;
};

export function UserProfile({ userId }: { userId: string }) {
	const { data, isPending, error } = useProfile(userId);

	if (isPending) {
		return (
			<Fragment>
				<Header>
					<BackButton />
					<div>
						<Skeleton className="h-6 w-40" />
						<Skeleton className="mt-1 w-20" />
					</div>
				</Header>
				<section className="relative w-full">
					<Skeleton className="aspect-header h-auto rounded-none" />
					<Avatar className="bg-tooltip border-background absolute -bottom-12 left-4 size-25 animate-pulse cursor-default border-6 lg:-bottom-15 lg:size-33" />
				</section>
				<section className="px-4 py-3">
					<Skeleton className="mt-12 h-6 w-40 lg:mt-15" />
					<Skeleton className="mt-1 h-5 w-25" />
				</section>
			</Fragment>
		);
	}

	if (error) {
		return;
	}

	const createDate = format(data.createdAt, `LLLL yyyy`);
	const { posts, bannerUrl, avatarUrl, followers, following, isFollowedByUser, location, website } = data;

	const profileMeta: ProfileMeta[] = [
		{ data: location, icon: "location" },
		{ data: website, icon: "copy", link: true },
		{ data: `Joined ${createDate}`, icon: "calender" }
	];

	return (
		<Fragment>
			<Header>
				<BackButton />
				<div>
					<HeaderTitle>{data.name}</HeaderTitle>
					<HeaderDescription className="flex items-center">
						<PostsCount userId={data.id} initialState={{ posts }} />
					</HeaderDescription>
				</div>
			</Header>
			<section className="relative w-full">
				<div className="bg-image aspect-header relative overflow-hidden">
					{bannerUrl && (
						<Link href={`/${data.username}/banner`}>
							<Image
								src={bannerUrl}
								width={600}
								height={200}
								alt="header"
								className="aspect-header w-full cursor-pointer object-cover"
							/>
						</Link>
					)}
				</div>
				<Link href={`/${data.username}/avatar`}>
					<Avatar className="bg-tooltip border-background absolute -bottom-12 left-4 size-25 border-6 lg:-bottom-15 lg:size-33">
						<AvatarImage src={avatarUrl} width={120} height={120} />
						<AvatarFallback />
					</Avatar>
				</Link>
			</section>
			<section className="px-4 py-3">
				<div className="flex min-h-9 w-full items-center justify-end gap-x-3">
					<FollowButton size="default" userId={data.id} initialState={{ followers, isFollowedByUser }} />
				</div>
				<div className="mt-3 lg:mt-6">
					<p className="text-foreground text-xl font-extrabold">{data.name}</p>
					<p className="text-muted-foreground text-base">{`@${data.username}`}</p>
					<div className="mt-3 space-y-3">
						<TextParser className="text-foreground text-base">{data.bio}</TextParser>
						<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
							{profileMeta.map(
								({ icon, data, link }) =>
									data && (
										<div key={icon} className="flex items-center gap-x-1.5 text-base">
											<Icon id={icon} className="fill-muted-foreground size-4" />
											{!link ? (
												<span className="text-muted-foreground">{data}</span>
											) : (
												<a href={data} target="_blank" className="text-accent hover:underline">
													{data.replace(/^https?:\/\//, "")}
												</a>
											)}
										</div>
									)
							)}
						</div>
						<div className="flex items-center gap-x-4">
							<Link
								href={`/${data.username}/following`}
								className="hover:border-foreground border-b border-transparent"
							>
								<FollowingCount userId={data.id} initialState={{ following }} />
							</Link>
							<Link
								href={`/${data.username}/followers`}
								className="hover:border-foreground border-b border-transparent"
							>
								<FollowersCount userId={data.id} initialState={{ followers, isFollowedByUser }} />
							</Link>
						</div>
					</div>
				</div>
			</section>
			<div className="grid grid-cols-3 border-b">
				<LinkTabs href={`/${data.username}`}>Posts</LinkTabs>
				<LinkTabs href={`/${data.username}/reposts`}>Reposts</LinkTabs>
				<LinkTabs href={`/${data.username}/likes`}>Likes</LinkTabs>
			</div>
		</Fragment>
	);
}
