"use client";
import { Fragment } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getProfile } from "@/actions/user/get-profile";

import { Icon } from "@/components/ui/icon";
import { LinkTabs } from "@/components/ui/link-tabs";
import { Name, Username, FollowButton } from "@/components/modules/user";
import { Header, HeaderTitle, HeaderDescription } from "@/components/modules/header";

import { ProfileMetadata } from "./profile-metadata";
import { EditProfileForm } from "./form/edit-profile-form";
import { ProfileLoading, ProfileError, ProfileNotFound } from "./profile-states";
import { ProfileAvatar, ProfileHeaderImage } from "./image-dialogs";

export function Profile() {
	const { username } = useParams<{ username: string }>();
	const profileLink = `/users/${username}/`;

	const { data, isPending, isError } = useQuery({
		queryKey: ["profile", username],
		queryFn: () => getProfile(username),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		throwOnError: true
	});

	if (isPending) {
		return <ProfileLoading />;
	}

	if (isError) {
		return <ProfileError username={username} />;
	}

	if (!data) {
		return <ProfileNotFound username={username} />;
	}

	const { tweets_count, followers_count, following_count, isCurrentUser, isFollowing, ...profile } = data;
	const tweetsNumber = tweets_count === 1 ? `${tweets_count} tweet` : `${tweets_count} tweets`;

	return (
		<Fragment>
			<Header>
				<HeaderTitle className="flex items-center gap-x-1">
					<span>{profile.name}</span>
					<Icon id="verified" className="fill-blue size-5" />
				</HeaderTitle>
				<HeaderDescription>{tweetsNumber}</HeaderDescription>
			</Header>
			<section className="relative w-full">
				<ProfileHeaderImage src={profile.header_image} />
				<ProfileAvatar avatar={profile.avatar} />
			</section>
			<section className="px-4 py-3">
				<div className="flex min-h-9 w-full items-center justify-end gap-x-3">
					{isCurrentUser ? <EditProfileForm /> : <FollowButton size="default" isFollowing={isFollowing} />}
				</div>
				<div className="mt-3 space-y-3 lg:mt-6">
					<div className="space-y-0.5">
						<Name
							name={profile.name}
							verified={profile.verified}
							className="gap-x-1 [&_p]:text-xl [&_p]:font-extrabold [&_svg]:size-5"
						/>
						<Username username={username} />
					</div>
					<p className="text-foreground text-base">{profile.bio}</p>
					<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
						<ProfileMetadata location={profile.location} created_at={profile.created_at} website={profile.website} />
					</div>
					<div className="flex items-center gap-x-4 text-base">
						<div className="text-muted-foreground flex cursor-pointer items-center hover:underline">
							<span className="text-foreground">{following_count}</span>
							<span className="w-1 text-transparent">1</span>
							<span>Following</span>
						</div>
						<div className="text-muted-foreground flex cursor-pointer items-center hover:underline">
							<span className="text-foreground">{followers_count}</span>
							<span className="w-1 text-transparent">1</span>
							<span>{followers_count === 1 ? "Follower" : "Followers"}</span>
						</div>
					</div>
				</div>
			</section>
			<div className="flex items-center border-b *:flex-1">
				<LinkTabs href={profileLink}>Tweets</LinkTabs>
				<LinkTabs href={profileLink + `likes/`}>Likes</LinkTabs>
				<LinkTabs href={profileLink + `retweets/`}>Retweets</LinkTabs>
				<LinkTabs href={profileLink + `media/`}>Media</LinkTabs>
			</div>
		</Fragment>
	);
}
