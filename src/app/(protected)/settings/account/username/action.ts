"use server";

import { Prisma } from "@prisma/client";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { usernameSchema } from "@/lib/validation";

export async function updateUsername(username: string) {
	try {
		const { success, error } = usernameSchema.safeParse({ username });
		if (!success) return { error: new Error(error.message), data: null };

		const user = await validateUser();
		if (!user) return { error: new Error("Unauthorized"), data: null };

		const data = await prisma.user.update({
			where: { id: user.id },
			data: { username },
			select: { username: true }
		});

		return { data, error: null };
	} catch (error) {
		console.error(error);

		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return {
					error: new Error("That username has been taken. Please choose another"),
					data: null
				};
			} else {
				return { error: new Error("Something went wrong, please try again"), data: null };
			}
		}

		return { error: new Error("Something went wrong, please try again"), data: null };
	}
}
