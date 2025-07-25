import { Fragment } from "react";

import { BackButton, Header, HeaderTitle } from "@/components/layout/header";

export default function PeopleLayout({ children }: { children: React.ReactNode }) {
	return (
		<Fragment>
			<Header>
				<BackButton />
				<HeaderTitle>People</HeaderTitle>
			</Header>

			{children}
		</Fragment>
	);
}
