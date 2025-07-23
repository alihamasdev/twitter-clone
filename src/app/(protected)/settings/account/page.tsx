import { Fragment } from "react";
import { type Metadata } from "next";

import { validateUser } from "@/lib/auth";
import { getFullDate } from "@/lib/date";
import { Header, HeaderTitle } from "@/components/layout/header";

import { UsernameTile } from "./username-tile";

export const metadata: Metadata = {
	title: "Account Information"
};

export default async function AccountPage() {
	const loggedInUser = await validateUser();

	return (
		<Fragment>
			<Header>
				<HeaderTitle>Account Information</HeaderTitle>
			</Header>
			<UsernameTile />
			<div className="px-4 py-3">
				<p>Email</p>
				<span className="text-muted-foreground text-sm font-normal">{loggedInUser.email}</span>
			</div>
			<div className="px-4 py-3">
				<p>Account creation</p>
				<span className="text-muted-foreground text-sm font-normal">
					{getFullDate(new Date(loggedInUser.created_at))}
				</span>
			</div>
		</Fragment>
	);
}
