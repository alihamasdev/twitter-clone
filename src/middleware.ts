import { type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
	return await updateSession(request);
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icons.svg|google.svg|github.svg).*)"]
};
