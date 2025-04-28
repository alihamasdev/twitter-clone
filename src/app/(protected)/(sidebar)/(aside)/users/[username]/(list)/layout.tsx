import { Fragment, Suspense } from "react";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { Skeleton } from "@/components/ui/skeleton";
import { Header, HeaderTitle, HeaderDescription } from "@/components/modules/header";
import { Spinner } from "@/components/ui/spinner";
import { Icon } from "@/components/ui/icon";
import { LinkTabs } from "@/components/ui/link-tabs";

interface UsersLayoutProps {
	children: React.ReactNode;
	params: Promise<{ username: string }>;
}

export default async function UsersLayout({ children, params }: UsersLayoutProps) {
	return (
		<Suspense
			fallback={
				<Fragment>
					<Header className="[&_div]:gap-y-1">
						<Skeleton className="h-6 w-60" />
						<Skeleton className="h-4 w-30" />
					</Header>
					<Spinner />
				</Fragment>
			}
		>
			<LayoutHeader params={params} />
			{children}
		</Suspense>
	);
}

interface LayoutHeaderProps extends Pick<UsersLayoutProps, "params"> {}

async function LayoutHeader({ params }: LayoutHeaderProps) {
	const { username } = await params;
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("profiles")
		.select(`id, name, verified`)
		.eq("username", username)
		.single();

	if (error) {
		if (error.code === "PGRST116") return notFound();
		throw new Error(error.message);
	}

	return (
		<Fragment>
			<Header className="border-none">
				<HeaderTitle className="flex items-center gap-x-1">
					<span>{data.name}</span>
					{data.verified && <Icon id="verified" className="fill-blue size-5" />}
				</HeaderTitle>
				<HeaderDescription>{`@${username}`}</HeaderDescription>
			</Header>
			<div className="grid grid-cols-2 border-b">
				<LinkTabs href={`followers`}>Followers</LinkTabs>
				<LinkTabs href={`following`}>Following</LinkTabs>
			</div>
		</Fragment>
	);
}
