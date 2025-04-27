import { Fragment } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/modules/header";

export function ProfileLoading() {
	return (
		<Fragment>
			<Header className="[&_div]:gap-y-1">
				<Skeleton className="h-6 w-50" />
				<Skeleton className="h-4 w-25" />
			</Header>
			<section className="relative w-full">
				<Skeleton className="bg-image h-50 rounded-none border-b" />
				<div className="bg-tooltip absolute -bottom-12 left-4 size-25 rounded-full border-6 lg:-bottom-15 lg:size-33" />
			</section>
			<section className="px-4 py-3">
				<div className="flex justify-end">
					<Skeleton className="h-9 w-25 rounded-full" />
				</div>
				<div className="mt-6 space-y-1">
					<Skeleton className="h-6 w-50" />
					<Skeleton className="h-4 w-25" />
				</div>
			</section>
		</Fragment>
	);
}
