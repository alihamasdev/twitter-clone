import { NextResponse, type NextRequest } from "next/server";
import { type Provider } from "@supabase/auth-js";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ provider: Provider }> }) {
	const { provider } = await params;

	const { auth } = await createClient();
	const {
		data: { url },
		error
	} = await auth.signInWithOAuth({
		provider,
		options: { redirectTo: new URL(`/api/auth/callback`, request.nextUrl.origin).toString() }
	});

	if (error || !url) {
		return NextResponse.redirect(new URL(`/auth/error`, request.nextUrl.origin));
	}

	return NextResponse.redirect(url);
}
