import { Fragment } from "react";

import { Header, HeaderTitle } from "@/components/layout/header";

export default function UserStatusLayout({ children }: { children: React.ReactNode }) {
	return (
		<Fragment>
			<Header>
				<HeaderTitle>Post</HeaderTitle>
			</Header>
			{children}
		</Fragment>
	);
}
