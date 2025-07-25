import { Fragment } from "react";

import { getUserByUsername } from "@/lib/dal";
import { UserProfile } from "@/components/user/user-profile";

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
			{children}
		</Fragment>
	);
}
