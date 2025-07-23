import { unauthorized } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function validateUser() {
	const { auth } = await createClient();
	const { data, error } = await auth.getClaims();

	if (error || !data) {
		return unauthorized();
	}

	return data.claims;
}
