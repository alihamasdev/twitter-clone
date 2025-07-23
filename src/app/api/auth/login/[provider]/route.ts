import { NextRequest, NextResponse } from "next/server";
import { type Provider } from "@supabase/auth-js";

import { createClient } from "@/lib/supabase/server";
import { baseUrl } from "@/utils/contants";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ provider: Provider }> }) {
	const { provider } = await params;

	const supabase = await createClient();
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: { redirectTo: `${baseUrl}/api/auth/callback` }
	});

	console.log({ data, baseUrl });

	if (error || !data.url) {
		return NextResponse.redirect(`${baseUrl}/auth/error`);
	}

	return NextResponse.redirect(data.url);
}
