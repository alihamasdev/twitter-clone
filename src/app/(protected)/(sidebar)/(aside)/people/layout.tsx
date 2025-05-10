import { Fragment } from "react";

import { Header, HeaderTitle } from "@/components/modules/header";

export default function PeopleLayout({ children }: { children: React.ReactNode }) {
	return (
		<Fragment>
			<Header>
				<HeaderTitle>People</HeaderTitle>
			</Header>
			{children}
		</Fragment>
	);
}
