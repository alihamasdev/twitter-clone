import { z } from "zod";

export const profileFormSchema = z.object({
	avatar: z.array(z.custom<File>()),
	header_image: z.array(z.custom<File>()),
	name: z.string().min(1, { message: "Name is required" }).max(20, { message: "Name can only contain 20 characters" }),
	bio: z.string().max(160, { message: "Bio can only contain 160 characters" }).nullable(),
	location: z.string().max(30, { message: "Location can only contain 30 characters" }).nullable(),
	website: z
		.string()
		.url("Website must be a valid url")
		.max(100, { message: "Website can only contain 100 characters" })
		.nullable()
});

export const tweetFormSchema = z
	.object({
		tweet_text: z.string().optional(),
		tweet_images: z.array(z.custom<File>()).optional()
	})
	.refine((data) => data.tweet_text || (data.tweet_images && data.tweet_images.length > 0), {
		message: "Tweet cannot be empty",
		path: []
	});
