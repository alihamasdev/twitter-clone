"use server";

import { getAuthUser } from "@/actions/auth/get-auth-user";
import { prisma } from "@/lib/db";

export async function checkFollowStatus(userId: string) {
	const { id: currentUserId } = await getAuthUser();

	const isFollowing = await prisma.followers.findFirst({
		where: {
			user_following: currentUserId,
			user_to_follow: userId
		},
		select: {
			id: true
		}
	});

	return !!isFollowing;
}

export async function toggleFollowAction(userId: string) {
	const { id: currentUserId } = await getAuthUser();
	if (userId === currentUserId) {
		throw new Error("You cannot follow or unfollow yourself.");
	}

	const followStatus = await checkFollowStatus(userId);

	if (!followStatus) {
		const follow = await prisma.followers.create({
			data: {
				user_following: currentUserId,
				user_to_follow: userId
			}
		});
		return !!follow;
	} else {
		const unfollow = await prisma.followers.deleteMany({
			where: {
				user_following: currentUserId,
				user_to_follow: userId
			}
		});
		return !!unfollow;
	}
}
