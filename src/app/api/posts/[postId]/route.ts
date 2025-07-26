import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPostDataInclude, type PostData, type PostPayload } from "@/types/post";
import { formatUserData } from "@/types/user";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
	try {
		const { postId } = await params;

		const { sub: loginUserId } = await validateUser();

		const postPayload = (await prisma.post.findUnique({
			where: { id: postId },
			include: getPostDataInclude(loginUserId)
		})) satisfies PostPayload | null;

		if (!postPayload) {
			return notFound();
		}

		const { user, _count, bookmarks, likes, reposts, ...post } = postPayload;

		const data = {
			...post,
			..._count,
			user: formatUserData(user),
			isLiked: !!likes.length,
			isReposted: !!reposts.length,
			isBookmarked: !!bookmarks.length
		} satisfies PostData;

		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
	try {
		const { postId } = await params;

		const { sub: loginUserId } = await validateUser();

		await prisma.post.delete({ where: { id: postId, userId: loginUserId } });

		return NextResponse.json({ message: "Post deleted" });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
