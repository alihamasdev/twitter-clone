import { z } from "zod";

export const profileSchema = z.object({
	avatar: z.instanceof(File).optional().optional(),
	header_image: z.instanceof(File).optional().nullable().optional(),
	name: z
		.string()
		.min(1, { message: "Name is required" })
		.max(20, { message: "Name can only contain 20 characters" })
		.optional(),
	bio: z.string().max(160, { message: "Bio can only contain 160 characters" }).nullable().optional(),
	location: z.string().max(30, { message: "Location can only contain 30 characters" }).nullable().optional(),
	website: z
		.string()
		.url("Website must be a valid url")
		.max(100, { message: "Website can only contain 100 characters" })
		.nullable()
		.optional()
});

export type ProfileSchema = z.infer<typeof profileSchema>;

export const tweetSchema = z
	.object({
		tweet_text: z.string().optional(),
		tweet_images: z.array(z.instanceof(File)).optional()
	})
	.refine((data) => data.tweet_text || (data.tweet_images && data.tweet_images.length > 0), {
		message: "Tweet cannot be empty",
		path: []
	});

export type TweetSchema = z.infer<typeof tweetSchema>;
