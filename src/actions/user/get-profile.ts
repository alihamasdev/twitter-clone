"use server";
import { cache } from "react";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export const getProfile = cache(async (username: string) => {
	const supabase = await createClient();
	const { data, error } = await supabase.from("profiles").select("*").eq("username", username).single();

	if (error) {
		if (error.code === "PGRST116") return notFound();
		throw new Error(error.message);
	}

	return { profile: data };
});
