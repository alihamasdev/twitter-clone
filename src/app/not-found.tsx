import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export default function NotFound() {
	return (
		<section className="flex-center h-dvh w-full flex-col gap-y-6">
			<Icon id="twitter" className="size-15" />
			<h2 className="text-foreground text-lg font-medium">This page could not be found</h2>
			<Link href="/home" className={buttonVariants({ variant: "accent" })}>
				Go to Home
			</Link>
		</section>
	);
}
