import { Fragment } from "react";
import { type Metadata } from "next";

import { BackButton, Header, HeaderTitle } from "@/components/layout/header";

export const metadata: Metadata = {
	title: "Display"
};

export default function DisplayLayout({ children }: { children: React.ReactNode }) {
	return (
		<Fragment>
			<Header>
				<BackButton pushUrl="/settings" />
				<HeaderTitle>Display</HeaderTitle>
			</Header>
			{children}
		</Fragment>
	);
}
