import { Fragment } from "react";

import { searchUsers } from "@/lib/dal";
import { Search } from "@/components/layout/search";
import { UserCard } from "@/components/user";

interface PageParams {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function ExplorePage({ searchParams }: PageParams) {
	const { query } = await searchParams;
	const users = await searchUsers(query);

	return (
		<Fragment>
			<div className="mb-3 px-4 pt-1">
				<Search defaultValue={query} />
			</div>
			{users.map((user) => (
				<UserCard key={user.id} user={user} />
			))}
		</Fragment>
	);
}
