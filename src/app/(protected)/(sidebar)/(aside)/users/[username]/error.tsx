"use client";
import { Fragment } from "react";
import { useParams } from "next/navigation";

import { Avatar } from "@/components/ui/avatar";
import { Error } from "@/components/ui/error";
import { Button } from "@/components/ui/button";
import { Header, HeaderTitle } from "@/components/modules/header";

export default function ProfileError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
	const { username } = useParams();

	return (
		<Fragment>
			<Header>
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
				<Error>
					<Button icon="retry" variant="accent" onClick={() => reset()}>
						Retry
					</Button>
				</Error>
			</section>
		</Fragment>
	);
}
