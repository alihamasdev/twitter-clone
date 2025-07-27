import { NextRequest, NextResponse } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PAGE_SIZE } from "@/utils/contants";
import { getPostDataInclude, type PostData, type PostPage, type PostPayload } from "@/types/post";
import { formatUserData } from "@/types/user";

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
	try {
		const { userId } = await params;
		const cursor = request.nextUrl.searchParams.get("cursor") || undefined;

		const { sub: loginUserId } = await validateUser();

		const postPayload = (await prisma.post.findMany({
			take: PAGE_SIZE + 1,
			orderBy: { createdAt: "desc" },
			where: { userId, parentId: { equals: null } },
			cursor: cursor ? { id: cursor } : undefined,
			include: getPostDataInclude(loginUserId)
		})) satisfies PostPayload[];

		const posts = postPayload.map(({ _count, likes, reposts, bookmarks, user, ...post }) => ({
			...post,
			..._count,
			user: formatUserData(user),
			isBookmarked: !!bookmarks.length,
			isLiked: !!likes.length,
			isReposted: !!reposts.length
		})) satisfies PostData[];

		const data: PostPage = {
			posts: posts.slice(0, PAGE_SIZE),
			nextCursor: posts.length > PAGE_SIZE ? posts[PAGE_SIZE].id : null
		};

		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
