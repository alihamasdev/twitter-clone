import type { Prisma, User } from "@prisma/client";

/** Prisma `UserSelect` Query extension for getting user data */
export const userDataSelect = {
	id: true,
	name: true,
	username: true,
	avatarUrl: true
} satisfies Prisma.UserSelect;

export type UserData = Prisma.UserGetPayload<{ select: typeof userDataSelect }>;

/** Prisma `UserSelect` Query extension function for getting followers count and check if current user is following */
export const getFollowersInfo = (loggedInUserId: string) => {
	return {
		followers: { where: { followingId: loggedInUserId }, select: { id: true } },
		_count: { select: { followers: true } }
	} satisfies Prisma.UserSelect;
};

export interface FollowerInfo {
	followers: number;
	isFollowedByUser: boolean;
}

export interface FollowingInfo {
	following: number;
}

export type UserDataWithFollowInfo = UserData & FollowerInfo;

export interface ProfilePageUser extends User, FollowerInfo, FollowingInfo {
	posts: number;
}
