import { Fragment } from "react";
import { type Metadata } from "next";

import { BackButton, Header, HeaderTitle } from "@/components/layout/header";

export const metadata: Metadata = {
	title: "Change Username"
};

export default function UsernameLayout({ children }: { children: React.ReactNode }) {
	return (
		<Fragment>
			<Header>
				<BackButton pushUrl="/settings/account" />
				<HeaderTitle>Change username</HeaderTitle>
			</Header>
			{children}
		</Fragment>
	);
}
