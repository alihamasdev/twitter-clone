import { Fragment, Suspense } from "react";

import { getProfile } from "@/actions/user/get-profile";

import { Header, HeaderTitle } from "@/components/modules/header";
import { Name, Username } from "@/components/modules/user";
import { ProfileAvatar, ProfileHeaderImage } from "./image-dialogs";
import { ProfileButton } from "./profile-button";
import { ProfileMetadata } from "./profile-metadata";
import { Icon } from "@/components/ui/icon";
import { FollowersCount, FollowingCount, TweetsCount } from "./profile-counts";
import { Skeleton } from "@/components/ui/skeleton";
import { LinkTabs } from "@/components/ui/link-tabs";

export async function Profile({ params }: { params: Promise<{ username: string }> }) {
	const { username } = await params;
	const { profile } = await getProfile(username);

	const { name, id, verified, avatar } = profile;
	const user = { name, username, id, verified, avatar };

	return (
		<Fragment>
			<Header>
				<HeaderTitle className="flex items-center gap-x-1">
					<span>{name}</span>
					<Icon id="verified" className="fill-blue size-5" />
				</HeaderTitle>
				<Suspense fallback={<Skeleton className="h-4 w-30" />}>
					<TweetsCount id={id} />
				</Suspense>
			</Header>
			<section className="relative w-full">
				<div className="bg-image relative h-auto max-h-50 w-full overflow-hidden border-b">
					<ProfileHeaderImage src={profile.header_image} />
				</div>
				<ProfileAvatar user={user} />
			</section>
			<section className="px-4 py-3">
				<div className="flex h-9 w-full items-center justify-end gap-x-3">
					<Suspense fallback={<Skeleton className="h-9 w-25 rounded-full" />}>
						<ProfileButton profileId={id} />
					</Suspense>
				</div>
				<div className="mt-6 space-y-3">
					<div className="space-y-0.5">
						<Name user={user} className="gap-x-1 [&_p]:text-xl [&_p]:font-extrabold [&_svg]:size-5" />
						<Username user={user} />
					</div>
					<p className="text-foreground text-base">{profile.bio}</p>
					<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
						<ProfileMetadata location={profile.location} created_at={profile.created_at} website={profile.website} />
					</div>
					<div className="flex items-center gap-x-4 text-base">
						<Suspense fallback={<Skeleton className="h-5 w-20" />}>
							<FollowingCount id={id} />
						</Suspense>
						<Suspense fallback={<Skeleton className="h-5 w-20" />}>
							<FollowersCount id={id} />
						</Suspense>
					</div>
				</div>
			</section>
			<div className="flex items-center border-b *:flex-1">
				<LinkTabs href={`/users/${username}/`}>Tweets</LinkTabs>
				<LinkTabs href={`/users/${username}/likes/`}>Likes</LinkTabs>
				<LinkTabs href={`/users/${username}/retweets/`}>Retweets</LinkTabs>
				<LinkTabs href={`/users/${username}/media/`}>Media</LinkTabs>
			</div>
		</Fragment>
	);
}
