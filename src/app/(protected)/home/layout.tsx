import { Fragment } from "react";

import { Header, HeaderTitle } from "@/components/layout/header";
import { PostForm } from "@/components/posts/form/post-form";

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
