"use server";

import { prisma } from "@/lib/db";
import { getAuthUser } from "@/actions/auth/get-auth-user";

import { type Prisma } from "@prisma/client";

export async function getUsersList(
	limit: number = 15,
	where?: Prisma.ProfileWhereInput,
	orderBy: Prisma.ProfileOrderByWithRelationInput = { created_at: "desc" }
) {
	const { id: currentUserId } = await getAuthUser();

	const query = await prisma.profile.findMany({
		take: limit,
		orderBy,
		where: { id: { not: currentUserId } },
		select: {
			id: true,
			name: true,
			username: true,
			verified: true,
			avatar: true,
			follower: { select: { id: true }, where: { user_following: currentUserId } }
		}
	});

	const usersList = query.map(({ follower, id, name, username, verified, avatar }) => {
		return {
			id,
			name,
			username,
			verified,
			avatar,
			isFollowing: follower.length > 0
		};
	});

	return usersList;
}
