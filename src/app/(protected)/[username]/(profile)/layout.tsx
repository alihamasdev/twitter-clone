import { Fragment } from "react";

import { UserProfile } from "@/components/user/user-profile";

export default async function Layout({ children, image }: { children: React.ReactNode; image: React.ReactNode }) {
	return (
		<Fragment>
			{image}
			<UserProfile />
			{children}
		</Fragment>
	);
}
