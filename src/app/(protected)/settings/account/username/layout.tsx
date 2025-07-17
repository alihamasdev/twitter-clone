import { Fragment } from "react";
import { type Metadata } from "next";

import { Header, HeaderTitle } from "@/components/layout/header";

export const metadata: Metadata = {
	title: "Change Username"
};

export default function UsernameLayout({ children }: { children: React.ReactNode }) {
	return (
		<Fragment>
			<Header>
				<HeaderTitle>Change username</HeaderTitle>
			</Header>
			{children}
		</Fragment>
	);
}
