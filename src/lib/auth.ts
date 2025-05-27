import { createClient } from "@/lib/supabase/server";

/**
 *	Gets the jwt or current user details if there is an existing session
 * @param	jwt If no JWT is provided, the JWT from the current session is used.
 * @note Provide `Authorization` header as jwt in **`API Routes`** as cookies are not available for some reasons
 **/

export async function validateUser(jwt?: string) {
	const { auth } = await createClient();
	const {
		data: { user }
	} = await auth.getUser(jwt);

	return user;
}
