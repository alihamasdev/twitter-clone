import { Fragment } from "react";
import { type Metadata } from "next";

import { Header, HeaderTitle } from "@/components/layout/header";

export const metadata: Metadata = {
	title: "Display"
};

export default function DisplayLayout({ children }: { children: React.ReactNode }) {
	return (
		<Fragment>
			<Header>
				<HeaderTitle>Display</HeaderTitle>
			</Header>
			{children}
		</Fragment>
	);
}
