"use server";

import { validateUser } from "@/lib/auth";
import { getPostById } from "@/lib/dal";
import { prisma } from "@/lib/db";
import { postSchema, type PostSchema } from "@/lib/validation";
import { type PostData } from "@/types/post";

export async function createPost(data: PostSchema): Promise<PostData> {
	const validation = postSchema.safeParse(data);
	if (!validation.success) {
		throw new Error("Invalid post data");
	}

	const { sub: loginUserId } = await validateUser();

	const createdPost = await prisma.post.create({
		data: {
			content: data.content,
			parentId: data.parentId,
			userId: loginUserId
		}
	});

	return await getPostById(createdPost.id);
}
