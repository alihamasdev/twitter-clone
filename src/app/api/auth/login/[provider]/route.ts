import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { type Provider } from "@supabase/auth-js";

import { createClient } from "@/lib/supabase/server";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ provider: Provider }> }) {
	const { provider } = await params;

	const baseUrl =
		process.env.NODE_ENV === "production" ? "https://twitter-alihamas.vercel.app" : "http://localhost:3000";

	const supabase = await createClient();
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: { redirectTo: `${baseUrl}/api/auth/callback` }
	});

	console.log({ data, baseUrl });

	if (error || !data.url) {
		return redirect(`${baseUrl}/auth/error`);
	}

	return redirect(data.url);
}
