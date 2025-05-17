import { Fragment } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Avatar } from "@/components/ui/avatar";
import { Error } from "@/components/ui/error";
import { Header, HeaderTitle } from "@/components/modules/header";

function ProfileLoading() {
	return (
		<Fragment>
			<Header className="[&_div]:gap-y-1">
				<Skeleton className="h-6 w-50" />
				<Skeleton className="h-4 w-25" />
			</Header>
			<section className="relative w-full">
				<Skeleton className="bg-image aspect-header h-auto rounded-none border-b" />
				<div className="bg-tooltip border-background absolute -bottom-12 left-4 size-25 rounded-full border-6 lg:-bottom-15 lg:size-33" />
			</section>
			<section className="px-4 py-3">
				<div className="flex justify-end">
					<Skeleton className="h-9 w-25 rounded-full" />
				</div>
				<div className="mt-3 space-y-3 lg:mt-6">
					<div className="space-y-1">
						<Skeleton className="h-6 w-50" />
						<Skeleton className="h-4 w-25" />
					</div>
				</div>
			</section>
			<Spinner />
		</Fragment>
	);
}

function ProfileError({ username }: { username: string }) {
	return (
		<Fragment>
			<Header className="[&_div]:gap-y-1">
				<HeaderTitle>{username}</HeaderTitle>
			</Header>
			<section className="relative w-full">
				<div className="bg-image aspect-header rounded-none border-b" />
				<div className="absolute -bottom-12 left-4 lg:-bottom-15">
					<Avatar className="border-background bg-tooltip size-25 border-6 lg:size-33" />
				</div>
			</section>
			<section className="px-4 py-3">
				<div className="min-h-9" />
				<p className="mt-3 text-xl font-extrabold lg:mt-6">{`@${username}`}</p>
				<Error />
			</section>
		</Fragment>
	);
}

export default function ProfileNotFound({ username }: { username: string }) {
	return (
		<Fragment>
			<Header className="[&_div]:gap-y-1">
				<HeaderTitle>Profile</HeaderTitle>
			</Header>
			<section className="relative w-full">
				<div className="bg-image aspect-header rounded-none border-b" />
				<div className="absolute -bottom-12 left-4 lg:-bottom-15">
					<Avatar className="border-background bg-tooltip size-25 border-6 lg:size-33" />
				</div>
			</section>
			<section className="px-4 py-3">
				<div className="min-h-9" />
				<p className="mt-3 text-xl font-extrabold lg:mt-6">{`@${username}`}</p>
				<div className="flex-center mt-30 flex-col gap-y-3">
					<h2 className="text-3xl font-extrabold">This account doesn&apos;t exist</h2>
					<p className="text-muted-foreground">Try searching for another.</p>
				</div>
			</section>
		</Fragment>
	);
}

export { ProfileLoading, ProfileError, ProfileNotFound };
