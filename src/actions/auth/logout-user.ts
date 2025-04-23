"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function logoutUser(supabase?: Awaited<ReturnType<typeof createClient>>) {
	const { auth } = supabase || (await createClient());
	await auth.signOut();
	redirect("/login");
}
