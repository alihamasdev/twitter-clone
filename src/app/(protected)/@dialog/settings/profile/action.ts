"use server";

import { type User } from "@prisma/client";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { type SupabaseClient } from "@/lib/supabase/types";
import { profileSchema, type ProfileSchema } from "@/lib/validation";
import { supabaseStorageUrl } from "@/utils/contants";

export async function updateProfile(
	values: ProfileSchema
): Promise<{ error: null; data: User } | { error: string; data: null }> {
	try {
		const { success, data, error } = profileSchema.safeParse(values);
		if (!success) return { error: error.message, data: null };

		const loggedInUser = await validateUser();

		const { avatar, banner, ...staticData } = data;
		const supabase = await createClient();

		const [avatarUrl, bannerUrl] = await Promise.all([
			uploadFile(supabase, `${loggedInUser.sub}/avatar.png`, avatar),
			uploadFile(supabase, `${loggedInUser.sub}/banner.png`, banner)
		]);

		const updatedData = await prisma.user.update({
			where: { id: loggedInUser.sub },
			data: { avatarUrl: avatarUrl ? `${supabaseStorageUrl}${avatarUrl}` : undefined, bannerUrl, ...staticData }
		});

		return { error: null, data: updatedData };
	} catch (error) {
		console.error(error);
		return { error: "Something went wrong, please try again", data: null };
	}
}

const uploadFile = async (supabase: SupabaseClient, path: string, file?: File | null) => {
	if (!file) return;

	const { data, error } = await supabase.storage.from("users").upload(path, file, { upsert: true });

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	return data.fullPath;
};
