import { Fragment } from "react";

import { getUserByUsername } from "@/lib/dal";
import { LinkTabs } from "@/components/ui/link-tabs";
import { BackButton, Header, HeaderTitle } from "@/components/layout/header";

export default async function ProfileFollowLayout({
	children,
	params
}: {
	children: React.ReactNode;
	params: Promise<{ username: string }>;
}) {
	const { username } = await params;
	const { name } = await getUserByUsername(username);

	return (
		<Fragment>
			<Header className="border-none">
				<BackButton pushUrl={`/${username}`} />
				<HeaderTitle>{name}</HeaderTitle>
			</Header>
			<div className="grid grid-cols-2 border-b">
				<LinkTabs href={`/${username}/following`}>Following</LinkTabs>
				<LinkTabs href={`/${username}/followers`}>Followers</LinkTabs>
			</div>

			{children}
		</Fragment>
	);
}
