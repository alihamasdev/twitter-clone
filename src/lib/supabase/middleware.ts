import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
					supabaseResponse = NextResponse.next({
						request
					});
					cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
				}
			}
		}
	);

	const {
		data: { user }
	} = await supabase.auth.getUser();

	// All routes are protected routed except routes starting with /auth
	if (!user && !request.nextUrl.pathname.startsWith("/auth")) {
		const url = request.nextUrl.clone();
		url.pathname = "/auth";
		return NextResponse.redirect(url);
	}

	if (user && request.nextUrl.pathname.startsWith("/auth")) {
		const url = request.nextUrl.clone();
		url.pathname = "/home";
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}
