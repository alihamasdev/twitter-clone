import { Fragment } from "react";

import { validateUser } from "@/lib/auth";
import { getFullDate } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { Header, HeaderTitle } from "@/components/layout/header";
import { GithubIcon, GoogleIcon } from "@/components/pages/auth/auth-icons";

import { UsernameTile } from "./username-tile";

export default async function AccountPage() {
	const user = await validateUser();
	if (!user) return;

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
			<div className="px-4 py-3">
				<p>Account linked with</p>
				<div className="flex items-center gap-x-3 mt-2">
					{user.identities?.map(({ provider }) => (
						<Button key={provider} size="icon">
							{provider === "google" && <GoogleIcon />}
							{provider === "github" && <GithubIcon />}
						</Button>
					))}
				</div>
			</div>
		</Fragment>
	);
}
