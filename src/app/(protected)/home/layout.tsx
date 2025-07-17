import { Fragment } from "react";
import { type Metadata } from "next";

import { Header, HeaderTitle } from "@/components/layout/header";
import { PostForm } from "@/components/posts/form/post-form";

export const metadata: Metadata = {
	title: "Home"
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<Fragment>
			<Header backButton={false}>
				<HeaderTitle>Home</HeaderTitle>
			</Header>
			<div className="relative w-full border-b px-4 py-3">
				<PostForm />
			</div>
			{children}
		</Fragment>
	);
}
