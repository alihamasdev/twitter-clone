import { Fragment, Suspense } from "react";

import { getProfile } from "@/actions/user/get-profile";

import { Skeleton } from "@/components/ui/skeleton";
import { Header, HeaderTitle } from "@/components/modules/header";
import { Name, Username } from "@/components/modules/user";
import { TweetsCount } from "./tweets-count";
import { ProfileAvatar, ProfileHeaderImage } from "./image-dialogs";
import { EditProfile } from "./edit-profile";
import { ProfileMetadata } from "./profile-metadata";
import { Icon } from "@/components/ui/icon";

export async function Profile({ params }: { params: Promise<{ username: string }> }) {
	const { username } = await params;
	const data = await getProfile(username);

	const { name, id, verified, avatar } = data;
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
					<ProfileHeaderImage src={data.header_image} />
				</div>
				<ProfileAvatar user={user} />
			</section>
			<section className="px-4 py-3">
				<div className="flex w-full items-center justify-end">
					<EditProfile data={data} />
				</div>
				<div className="mt-6 space-y-3">
					<div className="space-y-0.5">
						<Name user={user} className="gap-x-1 [&_p]:text-xl [&_p]:font-extrabold [&_svg]:size-5" />
						<Username user={user} />
					</div>
					<p className="text-foreground text-base">{data.bio}</p>
					<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
						<ProfileMetadata location={data.location} created_at={data.created_at} website={data.website} />
					</div>
					<div className="flex items-center gap-x-4 text-base">
						<p className="text-muted-foreground flex cursor-pointer items-center hover:underline">
							<span className="text-foreground">{data.following_count}</span>
							<span className="w-1 text-transparent">1</span>
							<span>Following</span>
						</p>
						<p className="text-muted-foreground flex cursor-pointer items-center hover:underline">
							<span className="text-foreground">{data.followers_count}</span>
							<span className="w-1 text-transparent">1</span>
							<span>{data.followers_count === 1 ? "Follower" : "Followers"}</span>
						</p>
					</div>
				</div>
			</section>
		</Fragment>
	);
}
