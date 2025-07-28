import { NextRequest, NextResponse } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PAGE_SIZE } from "@/utils/contants";
import { getPostLikeInfo, getPostRepostInfo, postDataCounts, type PostData, type PostPage } from "@/types/post";
import { formatUserData, getUserDataWithFollowesInfo } from "@/types/user";

export async function GET(request: NextRequest) {
	try {
		const cursor = request.nextUrl.searchParams.get("cursor") || undefined;

		const { sub: loginUserId } = await validateUser();

		const postPayload = await prisma.bookmark.findMany({
			take: PAGE_SIZE + 1,
			orderBy: { createdAt: "desc" },
			where: { userId: loginUserId, post: { parentId: { equals: null } } },
			cursor: cursor ? { id: Number(cursor) } : undefined,
			select: {
				id: true,
				user: { select: getUserDataWithFollowesInfo(loginUserId) },
				post: {
					include: {
						_count: postDataCounts,
						likes: getPostLikeInfo(loginUserId),
						reposts: getPostRepostInfo(loginUserId)
					}
				}
			}
		});

		const posts = postPayload.map(({ user, post: { _count, likes, reposts, ...post } }) => ({
			...post,
			..._count,
			user: formatUserData(user),
			isLiked: !!likes.length,
			isReposted: !!reposts.length,
			isBookmarked: true
		})) satisfies PostData[];

		const data: PostPage = {
			posts: posts.slice(0, PAGE_SIZE),
			nextCursor: posts.length > PAGE_SIZE ? postPayload[PAGE_SIZE].id : null
		};

		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
