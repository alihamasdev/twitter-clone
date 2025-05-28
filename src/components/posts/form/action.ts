"use server";

import type { Post } from "@prisma/client";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { postSchema, type PostSchema } from "@/lib/validation";

type CreatePostReturn = { error: string; data: null } | { data: Post; error: null };

export async function createPost(data: PostSchema): Promise<CreatePostReturn> {
	try {
		const validation = postSchema.safeParse(data);
		if (!validation.success) return { error: "Please provide valid data", data: null };

		const user = await validateUser();
		if (!user) return { error: "User is unauthorized", data: null };

		const newPost = await prisma.post.create({
			data: { content: data.content, userId: user.id }
		});

		return { data: newPost, error: null };
	} catch (error) {
		console.error(error);
		return { error: "Something went wrong, please try again.", data: null };
	}
}
