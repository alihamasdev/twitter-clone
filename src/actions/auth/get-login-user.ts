"use server";
import { cache } from "react";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/actions/auth/get-auth-user";
import { type Prisma } from "@prisma/client";
import { type DefaultArgs } from "@prisma/client/runtime/library";

export const getLoginUser = cache(async (client?: Awaited<ReturnType<typeof createClient>>, header_image?: true) => {
	const supabase = client || (await createClient());
	const { id: currentUserId } = await getAuthUser(supabase);

	const user = await prisma.profile.findUnique({
		where: { id: currentUserId },
		select: {
			id: true,
			name: true,
			username: true,
			avatar: true,
			verified: true,
			header_image: header_image || false
		}
	});
	if (!user) {
		await supabase.auth.signOut();
		redirect("/auth");
	}
	return user;
});
