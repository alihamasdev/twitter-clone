"use server";
import { cache } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export const getAuthUser = cache(async (supabase?: Awaited<ReturnType<typeof createClient>>) => {
	const { auth } = supabase || (await createClient());
	const { data, error } = await auth.getUser();
	if (error || !data.user) {
		await auth.signOut();
		redirect("/auth");
	}
	return data.user;
});
