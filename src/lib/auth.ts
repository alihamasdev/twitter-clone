import { createClient } from "@/lib/supabase/server";

export async function validateUser(jwt?: string) {
	const { auth } = await createClient();
	const {
		data: { user }
	} = await auth.getUser(jwt);

	return user;
}
