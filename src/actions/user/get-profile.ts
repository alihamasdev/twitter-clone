"use server";

import { cache } from "react";

import { type User } from "@/types/user";
import { getAuthUser } from "@/actions/auth/get-auth-user";
import { prisma } from "@/lib/db";

export const getProfile = cache(async (username: User["username"]) => {
	const { id: currentUserId } = await getAuthUser();

	const user = await prisma.profile.findUnique({
		where: { username },
		include: {
			_count: { select: { follower: true, following: true, tweets: true } },
			follower: { select: { id: true }, where: { user_following: currentUserId } }
		}
	});

	if (!user) return null;

	const { _count, follower, ...profile } = user;

	return {
		tweets_count: _count.tweets,
		followers_count: _count.follower,
		following_count: _count.following,
		isFollowing: follower.length > 0,
		isCurrentUser: profile.id === currentUserId,
		...profile
	};
});
