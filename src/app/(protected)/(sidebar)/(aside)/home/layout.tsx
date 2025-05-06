import { Fragment } from "react";

import { Header, HeaderTitle } from "@/components/modules/header";
import { TweetForm } from "@/components/modules/tweet/form/tweet-form";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<Fragment>
			<Header backButton={false}>
				<HeaderTitle>Home</HeaderTitle>
			</Header>
			<div className="relative border-b px-4 py-3">
				<TweetForm />
			</div>
			{children}
		</Fragment>
	);
}
