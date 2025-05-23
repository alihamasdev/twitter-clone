"use server";

import { randomUUID } from "crypto";
import { z } from "zod";

import { getAuthUser } from "@/actions/auth/get-auth-user";
import { prisma } from "@/lib/db";
import { tweetFormSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";

export async function createTweet(formData: z.infer<typeof tweetFormSchema>) {
	try {
		const validation = tweetFormSchema.safeParse(formData);
		if (!validation.success) return { error: "Please provide valid data" };

		const supabase = await createClient();
		const { id: currentUserId } = await getAuthUser();
		const { tweet_text, tweet_images } = formData;

		const tweetId = randomUUID();
		let imageUrls: string[] | undefined = undefined;
		if (tweet_images && tweet_images.length > 0) {
			const uploadPromises = tweet_images.map(async (file, index) => {
				const fileName = file.name.split(".").join(`_${index}.`);
				const filePath = `${currentUserId}/${tweetId}/${fileName}`;

				const { data, error } = await supabase.storage.from("tweets").upload(filePath, file, {
					contentType: file.type
				});

				if (error) throw new Error(`Failed to upload ${file.name}: ${error.message}`);

				return data.fullPath;
			});

			imageUrls = await Promise.all(uploadPromises);
		}

		const newTweet = await prisma.tweets.create({
			data: {
				id: tweetId,
				user_id: currentUserId,
				tweet_text: tweet_text,
				tweet_images: imageUrls
			}
		});

		return { newTweet, error: null };
	} catch (error) {
		console.error("Error creating tweet:", error);
		return { error: error instanceof Error ? error.message : "Failed to create tweet" };
	}
}
