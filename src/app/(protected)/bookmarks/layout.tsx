import { Fragment } from "react";
import { type Metadata } from "next";

import { Header, HeaderTitle } from "@/components/layout/header";

export const metadata: Metadata = {
	title: "Bookmarks"
};

export default function BookmarkLayout({ children }: { children: React.ReactNode }) {
	return (
		<Fragment>
			<Header>
				<HeaderTitle>Bookmarks</HeaderTitle>
			</Header>
			{children}
		</Fragment>
	);
}
