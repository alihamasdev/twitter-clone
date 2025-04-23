"use server";
import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/actions/auth/get-auth-user";

export const getUser = cache(async () => {
	const supabase = await createClient();
	const user = await getAuthUser(supabase);

	const { data, error } = await supabase
		.from("profiles")
		.select(`id, name, username, avatar, verified`)
		.eq("id", user.id)
		.single();

	if (error) throw new Error("User not found");

	return data;
});
