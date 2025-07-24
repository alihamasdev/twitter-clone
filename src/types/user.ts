import type { Prisma, User } from "@prisma/client";

import { type PostsCount } from "./post";

export const userDataSelect = {
	id: true,
	name: true,
	username: true,
	avatarUrl: true
} satisfies Prisma.UserSelect;

export type UserData = Prisma.UserGetPayload<{ select: typeof userDataSelect }>;

export const getFollowersInfo = (loggedInUserId: string) => {
	return {
		followers: { where: { followingId: loggedInUserId }, select: { id: true } },
		_count: { select: { followers: true } }
	} satisfies Prisma.UserSelect;
};

export const getUserDataWithFollowesInfo = (loggedInUserId: string) => {
	return { ...userDataSelect, ...getFollowersInfo(loggedInUserId) } satisfies Prisma.UserSelect;
};

export interface FollowerInfo {
	followers: number;
	isFollowedByUser: boolean;
}

export interface FollowingInfo {
	following: number;
}

export type UserDataWithFollowInfo = UserData & FollowerInfo;

export type ProfilePageUser = User & FollowerInfo & FollowingInfo & PostsCount;

export interface UserPage {
	users: UserDataWithFollowInfo[];
	nextCursor: string | number | null;
}
