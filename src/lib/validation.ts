import { z } from "zod";

import { prohibitedUsernames } from "@/utils/contants";

export const profileSchema = z.object({
	avatar: z.instanceof(File).optional().optional(),
	banner: z.instanceof(File).optional().nullable().optional(),
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

export const postSchema = z.object({
	content: z
		.string()
		.max(300, "Post can only contain 300 characters")
		.refine((data) => data.length > 0)
});

export type PostSchema = z.infer<typeof postSchema>;

export const usernameSchema = z.object({
	username: z
		.string()
		.min(4, "Your username must be longer than 4 characters.")
		.max(15, "Your username must be shorter than 15 characters.")
		.regex(/^[a-zA-Z0-9_]+$/, "Your username can only contain letters, numbers and '_'")
		.refine((username) => !prohibitedUsernames.includes(username), {
			message: "This username is unavailable. Please try another."
		})
});
