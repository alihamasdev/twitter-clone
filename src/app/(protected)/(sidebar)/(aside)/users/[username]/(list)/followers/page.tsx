"use server";
import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

import { UserCard } from "@/components/modules/user";

const getFollowers = cache(async (username: string) => {
	const supabase = await createClient();
	const { data: userData, error: userError } = await supabase
		.from("profiles")
		.select(`id`)
		.eq("username", username)
		.single();

	if (userError) throw new Error(userError.message);

	const { data, error } = await supabase
		.from("followers")
		.select(`id, profiles!followers_user_id_fkey (id, name, username, verified, avatar, bio)`)
		.eq("user_to_follow", userData.id);

	if (error) throw new Error(error.message);

	return { followers: data };
});

export default async function FollowersPage({ params }: { params: Promise<{ username: string }> }) {
	const { username } = await params;
	const { followers } = await getFollowers(username);

	if (followers.length === 0) {
		return (
			<div className="mt-25 flex w-full flex-col items-center p-8">
				<div className="w-full max-w-sm space-y-4 *:text-center">
					<h1 className="text-foreground text-3xl font-extrabold">Looking for followers?</h1>
					<p className="text-muted-foreground text-base/6">
						When someone follows this account, they&apos;ll show up here. Tweeting and interacting with others helps
						boost followers.
					</p>
				</div>
			</div>
		);
	}

	return followers?.map(({ id, profiles }) => {
		return <UserCard key={id} user={profiles} />;
	});
}
