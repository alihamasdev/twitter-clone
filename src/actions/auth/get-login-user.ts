"use server";
import { cache } from "react";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/actions/auth/get-auth-user";

export const getLoginUser = cache(async () => {
	try {
		const supabase = await createClient();
		const { id: currentUserId } = await getAuthUser(supabase);

		const user = await prisma.profile.findUnique({
			where: { id: currentUserId },
			select: {
				id: true,
				name: true,
				username: true,
				avatar: true,
				verified: true
			}
		});
		if (!user) {
			await supabase.auth.signOut();
			redirect("/auth");
		}
		return user;
	} catch (error) {
		console.log("Auth User Error", error);
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error("Unexpected error getting auth user");
	}
});
