"use server";

import { cache } from "react";
import { unstable_rethrow as rethrow, unauthorized } from "next/navigation";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { userDataSelect } from "@/types/user";

export const getLoginUserData = cache(async () => {
	const { user } = await validateUser();
	if (!user) return unauthorized();

	const data = await prisma.user.findUnique({
		where: { id: user.id },
		select: userDataSelect
	});

	return data;
});
