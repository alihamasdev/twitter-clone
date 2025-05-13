"use server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { supabaseStorage } from "@/utils/contants";
import { profileFormSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { getLoginUser } from "@/actions/auth/get-login-user";

const MAX_SIZE = 1 * 1024 * 1024; // 1MB

export async function updateProfile(formData: z.infer<typeof profileFormSchema>) {
	const validation = profileFormSchema.safeParse(formData);
	if (!validation.success) return { error: validation.error.message, data: null };

	const supabase = await createClient();
	const { id: userId, avatar: userAvatar, header_image: userHeader } = await getLoginUser(supabase);
	const { avatar, header_image, ...staticData } = formData;

	const formAvatar = avatar[avatar.length - 1];
	const formHeaderImage = header_image[header_image.length - 1];

	let updatedAvatar = userAvatar;
	let updatedHeaderImage = userHeader;

	if (formAvatar?.size > MAX_SIZE || formHeaderImage?.size > MAX_SIZE) {
		return { error: `File size must be less than ${MAX_SIZE / (1024 * 1024)} MB`, data: null };
	}

	if (formAvatar) {
		const { data, error } = await supabase.storage
			.from("avatars")
			.upload(`${userId}_avatar.png`, formAvatar, { upsert: true });
		if (error) return { error: error.message, data: null };
		updatedAvatar = `${supabaseStorage}${data.fullPath}`;
	}

	if (formHeaderImage) {
		const { data, error } = await supabase.storage
			.from("headers")
			.upload(`${userId}_header.png`, formHeaderImage, { upsert: true });
		if (error) return { error: error.message, data: null };
		updatedHeaderImage = data.fullPath;
	}

	const updatedProfile = await prisma.profile.update({
		where: { id: userId },
		data: { avatar: updatedAvatar, header_image: updatedHeaderImage, ...staticData }
	});

	return { error: null, data: updatedProfile };
}
