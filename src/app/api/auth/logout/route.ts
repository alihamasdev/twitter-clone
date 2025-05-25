import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
	const { auth } = await createClient();
	await auth.signOut();
	return NextResponse.redirect(new URL("/auth", request.url));
}
