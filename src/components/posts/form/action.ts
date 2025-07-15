"use server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { postSchema, type PostSchema } from "@/lib/validation";

export async function createPost(data: PostSchema) {
	const validation = postSchema.safeParse(data);
	if (!validation.success) {
		throw new Error("Invalid post data");
	}

	const user = await validateUser();
	if (!user) {
		throw new Error("User not authenticated");
	}

	return await prisma.post.create({ data: { content: data.content, userId: user.id } });
}
