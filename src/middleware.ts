import { type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
	return await updateSession(request);
}

export const config = {
	matcher: [
		"/((?!api|_next\/static|_next\/image|favicon\.ico|sitemap\.xml|robots\.txt|\.(?:jpg|jpeg|png|gif|svg|webp|ico|bmp|tiff|tif)).*)/"
	]
};
