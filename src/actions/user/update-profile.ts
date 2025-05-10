"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

import { supabaseStorage } from "@/utils/contants";
import { profileFormSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { getLoginUser } from "@/actions/auth/get-login-user";
import { type Tables } from "@/types/supabase";

export async function updateProfile(formData: z.infer<typeof profileFormSchema>) {
	const validation = profileFormSchema.safeParse(formData);
	if (!validation.success) return { errors: validation.error.flatten().fieldErrors };

	const supabase = await createClient();
	const { username } = await getLoginUser();
	const { avatar, header_image, ...staticData } = formData;
	const formAvatar = avatar[avatar.length - 1];
	const formHeaderImage = header_image[header_image.length - 1];

	if (formAvatar) {
		const { data, error } = await supabase.storage
			.from("avatars")
			.upload(`${username}_avatar.png`, formAvatar, { upsert: true });
		if (error) return { errors: { avatar: [error.message] } };
		const updatedAvatar = `${supabaseStorage}${data.fullPath}`;
		const resError = await updateUserData(supabase, { avatar: updatedAvatar, ...staticData }, username);
		if (resError) return { errors: { name: [resError] } };
	}

	if (formHeaderImage) {
		const { data, error } = await supabase.storage
			.from("headers")
			.upload(`${username}_header.png`, formHeaderImage, { upsert: true });
		if (error) return { errors: { header_image: [error.message] } };
		const resError = await updateUserData(supabase, { header_image: data.fullPath, ...staticData }, username);
		if (resError) return { errors: { name: [resError] } };
	}

	if (!formAvatar || !formHeaderImage) {
		const resError = await updateUserData(supabase, staticData, username);
		if (resError) return { errors: { name: [resError] } };
	}

	revalidatePath(`/users/${username}/`, "layout");
}

const updateUserData = async (
	supabase: Awaited<ReturnType<typeof createClient>>,
	updatedData: Partial<Tables<"profiles">>,
	username: Tables<"profiles">["username"]
) => {
	const { error } = await supabase.from("profiles").update(updatedData).eq("username", username);
	if (error) return error.message;
};
