"use server";
import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

import { UserCard } from "@/components/modules/user";

const getFollowing = cache(async (username: string) => {
	const supabase = await createClient();
	const { data: userData, error: userError } = await supabase
		.from("profiles")
		.select(`id`)
		.eq("username", username)
		.single();

	if (userError) throw new Error(userError.message);

	const { data, error } = await supabase
		.from("followers")
		.select(`id, profiles!followers_user_to_follow_fkey (id, name, username, verified, avatar, bio)`)
		.eq("user_id", userData.id);

	if (error) throw new Error(error.message);

	return { following: data };
});

export default async function FollowingPage({ params }: { params: Promise<{ username: string }> }) {
	const { username } = await params;
	const { following } = await getFollowing(username);

	if (following.length === 0) {
		return (
			<div className="mt-25 flex w-full flex-col items-center p-8">
				<div className="w-full max-w-sm space-y-4 *:text-center">
					<h1 className="text-foreground text-3xl font-extrabold">Be in the know</h1>
					<p className="text-muted-foreground text-base/6">
						Following accounts is an easy way to curate your timeline and know what&apos;s happening with the topics and
						people you&apos;re interested in.
					</p>
				</div>
			</div>
		);
	}

	return following.map(({ id, profiles }) => {
		return <UserCard key={id} user={profiles} />;
	});
}
