import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/actions/auth/get-user";

import { Error } from "@/components/ui/error";
import { UserCard } from "@/components/modules/user";
import { Spinner } from "@/components/ui/spinner";

export function SuggestedUsersLoader() {
	return (
		<section className="flex-center h-50 w-full overflow-hidden rounded-2xl border">
			<Spinner className="mx-0 mt-0" />
		</section>
	);
}

export async function SuggestedUsers() {
	const supabase = await createClient();
	const user = await getUser();
	const { data, error } = await supabase
		.from("profiles")
		.select(`name, username, id, avatar, verified`)
		.neq("id", user.id)
		.limit(3);

	if (error) {
		return (
			<section className="flex-center h-50 w-full overflow-hidden rounded-2xl border">
				<Error className="mt-0" />
			</section>
		);
	}

	return (
		<section className="w-full overflow-hidden rounded-2xl border">
			<h1 className="px-4 py-3 text-xl font-extrabold">Who to follow</h1>
			{data.map((user) => {
				return <UserCard key={user.id} user={user} />;
			})}
			<Link href="/people" className="hover:bg-muted text-accent block px-4 py-3 text-sm transition-colors">
				Show more
			</Link>
		</section>
	);
}
