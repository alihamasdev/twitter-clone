import { Fragment } from "react";

import { BackButton, Header, HeaderTitle } from "@/components/layout/header";

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
	return (
		<Fragment>
			<Header className="border-none">
				<BackButton />
				<HeaderTitle>Explore</HeaderTitle>
			</Header>
			{children}
		</Fragment>
	);
}
