"use server";

import { cache } from "react";
import { unauthorized } from "next/navigation";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { userDataSelect, type UserData } from "@/types/user";

/** Gets currently loggedIn user from database for global state `AuthContext` */
export const getLoginUserData = cache(async (): Promise<UserData | null> => {
	const user = await validateUser();
	if (!user) return unauthorized();

	const data = await prisma.user.findUnique({
		where: { id: user.id },
		select: userDataSelect
	});

	return data;
});
