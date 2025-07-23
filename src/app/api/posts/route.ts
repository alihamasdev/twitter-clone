import { NextRequest, NextResponse } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PAGE_SIZE } from "@/utils/contants";
import { getPostDataInclude, PostData, type PostPage, type PostPayload } from "@/types/post";

export async function GET(request: NextRequest) {
	try {
		const cursor = request.nextUrl.searchParams.get("cursor") || undefined;

		const loggedInUser = await validateUser();

		const query = getPostDataInclude(loggedInUser.sub);

		const postPayload = (await prisma.post.findMany({
			include: query,
			orderBy: { createdAt: "desc" },
			take: PAGE_SIZE + 1,
			cursor: cursor ? { id: cursor } : undefined
		})) satisfies PostPayload[];

		const posts: PostData[] = postPayload.map((data) => ({
			id: data.id,
			content: data.content,
			createdAt: data.createdAt,
			userId: data.userId,
			user: {
				id: data.user.id,
				name: data.user.name,
				username: data.user.username,
				avatarUrl: data.user.avatarUrl,
				followers: data.user._count.followers,
				isFollowedByUser: !!data.user.followers.length
			},
			likes: data._count.likes,
			reposts: data._count.reposts,
			isBookmarked: !!data.bookmarks.length,
			isLiked: !!data.likes.length,
			isReposted: !!data.reposts.length
		}));

		const nextCursor = posts.length > PAGE_SIZE ? posts[PAGE_SIZE].id : null;

		const data: PostPage = {
			posts: posts.slice(0, PAGE_SIZE),
			nextCursor
		};

		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
