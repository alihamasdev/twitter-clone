"use server";

import { createClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/actions/auth/get-auth-user";
import { type Tables } from "@/types/supabase";

export async function followUser(userId: Tables<"profiles">["id"]) {
	const supabase = await createClient();
	const { id } = await getAuthUser(supabase);
	const { error } = await supabase.from("followers").insert({ user_id: id, user_to_follow: userId });

	if (error) {
		return { success: false, error: error.message };
	}

	return { success: true };
}

export async function unfollowUser(userId: Tables<"profiles">["id"]) {
	const supabase = await createClient();
	const { id } = await getAuthUser(supabase);
	const { error } = await supabase.from("followers").delete().match({ user_id: id, user_to_follow: userId });

	if (error) {
		return { success: false, error: error.message };
	}

	return { success: true };
}
