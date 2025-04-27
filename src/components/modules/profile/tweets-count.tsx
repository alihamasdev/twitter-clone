import { type User } from "@/types/user";
import { createClient } from "@/lib/supabase/server";

import { HeaderDescription } from "@/components/modules/header";

interface TweetsCountProps extends Pick<User, "id"> {
	client?: Awaited<ReturnType<typeof createClient>>;
}

export async function TweetsCount({ client, id }: TweetsCountProps) {
	const supabase = client || (await createClient());
	const { count, error } = await supabase.from("tweets").select(undefined, { count: "exact" }).eq("user_id", id);

	if (error) return;

	const tweetCount = count === 1 ? `${count} tweet` : `${count} tweets`;

	return <HeaderDescription>{tweetCount}</HeaderDescription>;
}
