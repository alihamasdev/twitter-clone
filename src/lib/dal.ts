"use server";

import { cache } from "react";
import { notFound } from "next/navigation";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getUserDataWithFollowesInfo, userDataSelect, type UserData, type UserDataWithFollowInfo } from "@/types/user";

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

	const data = await prisma.user.findMany({
		take: limit,
		where: { NOT: { id: loggedInUser.sub } },
		select: getUserDataWithFollowesInfo(loggedInUser.sub)
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

export const getUserByUsername = cache(async (username: string) => {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true, name: true }
	});

	if (!user) {
		return notFound();
	}

	return { userId: user.id, name: user.name };
});
