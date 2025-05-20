"use server";

import { redirect } from "next/navigation";
import { type Provider } from "@supabase/auth-js";

import { createClient } from "@/lib/supabase/server";
import { baseUrl } from "@/utils/contants";

async function oAuthLogin(provider: Provider) {
	const { auth } = await createClient();
	const { data } = await auth.signInWithOAuth({
		provider,
		options: { redirectTo: `${baseUrl}/auth/callback`, queryParams: { next: "/home" } }
	});

	if (data.url) redirect(data.url);
}

async function googleLogin() {
	await oAuthLogin("google");
}

async function githubLogin() {
	await oAuthLogin("github");
}

export { googleLogin, githubLogin };
