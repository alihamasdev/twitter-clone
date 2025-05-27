import { Fragment } from "react";

import { Header, HeaderTitle } from "@/components/layout/header";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<Fragment>
			<Header backButton={false}>
				<HeaderTitle>Home</HeaderTitle>
			</Header>
			{children}
		</Fragment>
	);
}
