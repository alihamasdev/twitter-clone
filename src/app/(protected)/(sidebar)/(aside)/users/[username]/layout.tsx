"use server";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { getProfile } from "@/actions/user/get-profile";

import { Profile } from "@/components/modules/profile";
import { ProfileLoading } from "@/components/modules/profile/profile-states";

interface ProfileLayoutProps extends React.PropsWithChildren {
	params: Promise<{ username: string }>;
}

export default async function ProfileLayout({ params, children }: ProfileLayoutProps) {
	return (
		<Suspense fallback={<ProfileLoading />}>
			<FetchProfile params={params} />
			{children}
		</Suspense>
	);
}

async function FetchProfile({ params }: { params: Promise<{ username: string }> }) {
	const { username } = await params;
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["profile", username],
		queryFn: () => getProfile(username),
		staleTime: 5 * 60 * 1000
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Profile />
		</HydrationBoundary>
	);
}
