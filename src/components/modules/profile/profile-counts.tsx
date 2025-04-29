import Link from "next/link";

import { type User } from "@/types/user";
import { createClient } from "@/lib/supabase/server";

import { HeaderDescription } from "@/components/modules/header";

export async function TweetsCount({ id }: Pick<User, "id">) {
	const supabase = await createClient();
	const { count, error } = await supabase
		.from("tweets")
		.select(undefined, { count: "exact", head: true })
		.eq("user_id", id);

	if (error) return;

	const tweetCount = count === 1 ? `${count} tweet` : `${count} tweets`;

	return <HeaderDescription>{tweetCount}</HeaderDescription>;
}

export async function FollowersCount({ id }: Pick<User, "id">) {
	const supabase = await createClient();
	const { count, error } = await supabase
		.from("followers")
		.select(undefined, { count: "exact", head: true })
		.eq("user_to_follow", id);

	if (error) return;

	return (
		<Link href={`followers`} className="text-muted-foreground flex cursor-pointer items-center hover:underline">
			<span className="text-foreground">{count}</span>
			<span className="w-1 text-transparent">1</span>
			<span>{count === 1 ? "Follower" : "Followers"}</span>
		</Link>
	);
}

export async function FollowingCount({ id }: Pick<User, "id">) {
	const supabase = await createClient();
	const { count, error } = await supabase
		.from("followers")
		.select(undefined, { count: "exact", head: true })
		.eq("user_id", id);

	if (error) return;

	return (
		<Link href={`following`} className="text-muted-foreground flex cursor-pointer items-center hover:underline">
			<span className="text-foreground">{count}</span>
			<span className="w-1 text-transparent">1</span>
			<span>Following</span>
		</Link>
	);
}
