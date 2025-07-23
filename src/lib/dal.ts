"use server";

import { cache } from "react";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getFollowersInfo, userDataSelect, type UserData, type UserDataWithFollowInfo } from "@/types/user";

/** Gets currently loggedIn user from database for global state `AuthContext` */
export const getLoginUserData = cache(async (): Promise<UserData | null> => {
	const loggedInUser = await validateUser();

	const data = await prisma.user.findUnique({
		where: { id: loggedInUser.sub },
		select: userDataSelect
	});

	return data;
});

export const getUsersList = cache(async (limit = 4) => {
	const loggedInUser = await validateUser();

	const followerInfo = getFollowersInfo(loggedInUser.sub);
	const data = await prisma.user.findMany({
		take: limit,
		where: { NOT: { id: loggedInUser.sub } },
		select: { ...userDataSelect, ...followerInfo }
	});

	const dataList: UserDataWithFollowInfo[] = data.map(({ _count, followers, ...data }) => {
		return {
			...data,
			followers: _count.followers,
			isFollowedByUser: !!followers.length
		};
	});

	return dataList;
});
