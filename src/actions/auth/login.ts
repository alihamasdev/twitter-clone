"use server";
import { redirect } from "next/navigation";
import { type Provider } from "@supabase/auth-js";

import { createClient } from "@/lib/supabase/server";

async function oAuthLogin(provider: Provider) {
	const { auth } = await createClient();
	const { data, error } = await auth.signInWithOAuth({
		provider,
		options: { redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`, queryParams: { next: "/home" } }
	});
	console.log({ error, data });
	if (data.url) redirect(data.url);
}

async function googleLogin() {
	await oAuthLogin("google");
}

async function githubLogin() {
	await oAuthLogin("github");
}

export { googleLogin, githubLogin };
