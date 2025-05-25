import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { baseUrl } from "@/utils/contants";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");

	if (code) {
		const supabase = await createClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			const isDevEnv = process.env.NODE_ENV === "development";
			if (isDevEnv) {
				return NextResponse.redirect(`${baseUrl}/home`);
			} else {
				return NextResponse.redirect(`${baseUrl}/home`);
			}
		}
	}

	return NextResponse.redirect(`${baseUrl}/auth/error`);
}
