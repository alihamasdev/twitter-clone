import { Fragment } from "react";
import { type Metadata } from "next";
import { unauthorized } from "next/navigation";

import { getFullDate } from "@/lib/date";
import { createClient } from "@/lib/supabase/server";
import { Header, HeaderTitle } from "@/components/layout/header";

import { UsernameTile } from "./username-tile";

export const metadata: Metadata = {
	title: "Account Information"
};

export default async function AccountPage() {
	const supabase = await createClient();
	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		return unauthorized();
	}

	return (
		<Fragment>
			<Header>
				<HeaderTitle>Account Information</HeaderTitle>
			</Header>
			<UsernameTile />
			<div className="px-4 py-3">
				<p>Email</p>
				<span className="text-muted-foreground text-sm font-normal">{user.email}</span>
			</div>
			<div className="px-4 py-3">
				<p>Account creation</p>
				<span className="text-muted-foreground text-sm font-normal">{getFullDate(new Date(user.created_at))}</span>
			</div>
		</Fragment>
	);
}
