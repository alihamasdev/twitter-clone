"use server";

import { z } from "zod";

import { getAuthUser } from "@/actions/auth/get-auth-user";
import { prisma } from "@/lib/db";
import { profileFormSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { supabaseStorage } from "@/utils/contants";

export async function updateProfile(formData: z.infer<typeof profileFormSchema>) {
	const validation = profileFormSchema.safeParse(formData);
	if (!validation.success) return { error: validation.error.message, data: null };

	const supabase = await createClient();
	const { id: userId } = await getAuthUser(supabase);
	const { avatar, header_image, ...staticData } = formData;

	let updatedAvatar: string | undefined = undefined;
	let updatedHeaderImage: string | undefined = undefined;

	if (avatar) {
		const { data, error } = await supabase.storage
			.from("avatars")
			.upload(`${userId}_avatar.png`, avatar, { upsert: true, metadata: { time: Date.now() } });
		if (error) return { error: error.message, data: null };
		updatedAvatar = `${supabaseStorage}${data.fullPath}`;
	}

	if (header_image) {
		const { data, error } = await supabase.storage
			.from("headers")
			.upload(`${userId}_header.png`, header_image, { upsert: true, metadata: { time: Date.now() } });
		if (error) return { error: error.message, data: null };
		updatedHeaderImage = data.fullPath;
	}

	const updatedProfile = await prisma.profile.update({
		where: { id: userId },
		data: { header_image: updatedHeaderImage, avatar: updatedAvatar, ...staticData }
	});

	return { error: null, data: updatedProfile };
}
