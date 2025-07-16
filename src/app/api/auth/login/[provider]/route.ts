import { NextResponse, type NextRequest } from "next/server";
import { type Provider } from "@supabase/auth-js";

import { createClient } from "@/lib/supabase/server";
import { baseUrl } from "@/utils/contants";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ provider: Provider }> }) {
	const { provider } = await params;

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
