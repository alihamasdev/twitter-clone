"use server";
import { z } from "zod";
import { randomUUID } from "crypto";

import { tweetFormSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/actions/auth/get-auth-user";

export async function createTweet(formData: z.infer<typeof tweetFormSchema>) {
	try {
		const validation = tweetFormSchema.safeParse(formData);
		if (!validation.success) return { error: "Please provide valid data" };

		const supabase = await createClient();
		const { id } = await getAuthUser();
		const { tweet_text, tweet_images } = formData;

		let imageUrls: string[] | null = null;
		if (tweet_images && tweet_images.length > 0) {
			const uploadPromises = tweet_images.map(async (file) => {
				if (!file || file.size === 0) throw new Error(`Invalid file: ${file?.name || "unknown"}`);

				const uuid = randomUUID();
				const filePath = `${id}/${uuid}`;

				const { data, error } = await supabase.storage.from("tweets").upload(filePath, file, {
					contentType: file.type
				});

				if (error) throw new Error(`Failed to upload ${file.name}: ${error.message}`);

				return data.fullPath;
			});

			imageUrls = await Promise.all(uploadPromises);
		}

		const { error } = await supabase.from("tweets").insert({
			tweet_text: tweet_text || null,
			tweet_images: imageUrls,
			user_id: id
		});

		if (error) return { error: error.message };

		return { error: null };
	} catch (error) {
		console.error("Error creating tweet:", error);
		return { error: error instanceof Error ? error.message : "Failed to create tweet" };
	}
}
