import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
	try {
		const { auth } = await createClient();
		await auth.signOut();
		return NextResponse.redirect(new URL("/auth", request.nextUrl));
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
