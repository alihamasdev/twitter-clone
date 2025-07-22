import { NextResponse, type NextRequest } from "next/server";
import { type Provider } from "@supabase/auth-js";

import { createClient } from "@/lib/supabase/server";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ provider: Provider }> }) {
	const { provider } = await params;
	const baseUrl =
		process.env.NODE_ENV === "production" ? `https://twitter-alihamas.vercel.app` : "http://localhost:3000";

	const { auth } = await createClient();
	const {
		data: { url },
		error
	} = await auth.signInWithOAuth({
		provider,
		options: { redirectTo: `${baseUrl}/api/auth/callback` }
	});

	if (error || !url) {
		return NextResponse.redirect(`${baseUrl}/auth/error`);
	}

	return NextResponse.redirect(url);
}
