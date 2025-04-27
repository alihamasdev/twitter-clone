"use server";
import { Suspense } from "react";

import { Profile } from "@/components/modules/profile";
import { ProfileLoading } from "@/components/modules/profile/profile-loading";

interface ProfileLayoutProps {
	params: Promise<{ username: string }>;
	children: React.ReactNode;
}

export default async function ProfileLayout({ params, children }: ProfileLayoutProps) {
	return (
		<Suspense fallback={<ProfileLoading />}>
			<Profile params={params} />
			{children}
		</Suspense>
	);
}
