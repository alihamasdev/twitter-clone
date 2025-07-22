import { NextResponse, type NextRequest } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPostDataInclude, type PostData, type PostPayload } from "@/types/post";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
	try {
		const { postId } = await params;

		const user = await validateUser();
		if (!user) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		const query = getPostDataInclude(user.id);

		const post = (await prisma.post.findUnique({
			where: { id: postId },
			include: query
		})) satisfies PostPayload | null;

		if (!post) {
			return NextResponse.json({ error: "Not Found" }, { status: 404 });
		}

		const data = {
			id: post.id,
			content: post.content,
			createdAt: post.createdAt,
			userId: post.userId,
			user: {
				id: post.user.id,
				name: post.user.name,
				username: post.user.username,
				avatarUrl: post.user.avatarUrl,
				followers: post.user._count.followers,
				isFollowedByUser: !!post.user.followers.length
			},
			likes: post._count.likes,
			reposts: post._count.reposts,
			isBookmarked: !!post.bookmarks.length,
			isLiked: !!post.likes.length,
			isReposted: !!post.reposts.length
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

		const user = await validateUser();
		if (!user) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		await prisma.post.delete({ where: { id: postId, userId: user.id } });

		return NextResponse.json({ message: "Post deleted" });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
