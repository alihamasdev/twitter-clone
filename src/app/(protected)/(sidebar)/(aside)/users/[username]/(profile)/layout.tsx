"use server";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { getProfile } from "@/actions/user/get-profile";

import { Profile } from "@/components/modules/profile";
import { ProfileLoading } from "@/components/modules/profile/profile-states";

interface ProfileLayoutProps {
	params: Promise<{ username: string }>;
	children: React.ReactNode;
}

export default async function ProfileLayout({ params, children }: ProfileLayoutProps) {
	const { username } = await params;

	return (
		<Suspense fallback={<ProfileLoading />}>
			<FetchhProfile username={username} />
			{children}
		</Suspense>
	);
}

async function FetchhProfile({ username }: { username: string }) {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["profile", username],
		queryFn: () => getProfile(username),
		staleTime: 5 * 60 * 1000
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Profile username={username} />
		</HydrationBoundary>
	);
}
