"use server";

import { createClient } from "@/lib/supabase/server";
import { logoutUser } from "@/actions/auth/logout-user";

export const getAuthUser = async (supabase?: Awaited<ReturnType<typeof createClient>>) => {
	const { auth } = supabase || (await createClient());
	const { data, error } = await auth.getUser();
	if (error || !data.user) {
		await logoutUser(supabase);
		throw new Error("User not authenticated");
	}
	return data.user;
};
