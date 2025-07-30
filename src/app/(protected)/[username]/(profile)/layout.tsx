import { Fragment } from "react";

import { getUserByUsername } from "@/lib/dal";
import { LinkTabs } from "@/components/ui/link-tabs";

import { UserProfile } from "./user-profile";

interface ProfileLayoutProps {
	children: React.ReactNode;
	image: React.ReactNode;
	params: Promise<{ username: string }>;
}

export default async function ProfileLayout({ children, image, params }: ProfileLayoutProps) {
	const { username } = await params;
	const { userId } = await getUserByUsername(username);

	return (
		<Fragment>
			{image}
			<UserProfile userId={userId} />
			<div className="grid grid-cols-4 border-b">
				<LinkTabs href={`/${username}`}>Posts</LinkTabs>
				<LinkTabs href={`/${username}/reposts`}>Reposts</LinkTabs>
				<LinkTabs href={`/${username}/replies`}>Replies</LinkTabs>
				<LinkTabs href={`/${username}/likes`}>Likes</LinkTabs>
			</div>
			{children}
		</Fragment>
	);
}
