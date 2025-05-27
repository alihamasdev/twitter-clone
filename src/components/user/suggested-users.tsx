import { Suspense } from "react";

import { Spinner } from "@/components/ui/spinner";

export function SuggestedUsers() {
	return (
		<Suspense
			name="suggested users"
			fallback={
				<section className="w-full rounded-2xl flex-center h-75 border">
					<Spinner className="mt-0" />
				</section>
			}
		>
			<UsersList />
		</Suspense>
	);
}

export function UsersList() {
	return (
		<section className="w-full overflow-hidden rounded-2xl border">
			<h1 className="px-4 py-3 text-xl font-extrabold">Who to follow</h1>
			<div className="w-full h-64" />
		</section>
	);
}
