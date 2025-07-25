import { Fragment } from "react";

import { BackButton, Header, HeaderTitle } from "@/components/layout/header";

export default function UserStatusLayout({ children }: { children: React.ReactNode }) {
	return (
		<Fragment>
			<Header>
				<BackButton pushUrl={null} />
				<HeaderTitle>Post</HeaderTitle>
			</Header>
			{children}
		</Fragment>
	);
}
