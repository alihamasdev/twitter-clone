"use server";

import { redirect } from "next/navigation";
import { type Provider } from "@supabase/auth-js";

import { createClient } from "@/lib/supabase/server";
import { baseUrl } from "@/utils/contants";

export async function validateUser(jwt?: string) {
	const { auth } = await createClient();
	const {
		data: { user }
	} = await auth.getUser(jwt);

	return { user };
}

export async function logoutUser() {
	const { auth } = await createClient();
	await auth.signOut();
	return redirect("/auth");
}

export async function loginUser(provider: Provider) {
	const { auth } = await createClient();
	const { data } = await auth.signInWithOAuth({
		provider,
		options: { redirectTo: new URL(`/api/auth/callback`, baseUrl).toString() }
	});

	if (data.url) {
		return redirect(data.url);
	}

	return redirect("/auth/error");
}
