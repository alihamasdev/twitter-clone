import { NextRequest, NextResponse } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PAGE_SIZE } from "@/utils/contants";
import { getPostBookmarkInfo, getPostRepostInfo, postDataCounts, type PostData, type PostPage } from "@/types/post";
import { formatUserData, getUserDataWithFollowesInfo } from "@/types/user";

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
	try {
		const { userId } = await params;
		const cursor = request.nextUrl.searchParams.get("cursor") || undefined;

		const { sub: loginUserId } = await validateUser();

		const postPayload = await prisma.like.findMany({
			take: PAGE_SIZE + 1,
			orderBy: { createdAt: "desc" },
			where: { userId },
			cursor: cursor ? { id: Number(cursor) } : undefined,
			select: {
				id: true,
				user: { select: getUserDataWithFollowesInfo(loginUserId) },
				post: {
					include: {
						_count: postDataCounts,
						bookmarks: getPostBookmarkInfo(loginUserId),
						reposts: getPostRepostInfo(loginUserId)
					}
				}
			}
		});

		const posts = postPayload.map(({ user, post: { _count, reposts, bookmarks, ...post } }) => ({
			...post,
			..._count,
			user: formatUserData(user),
			isBookmarked: !!bookmarks.length,
			isReposted: !!reposts.length,
			isLiked: true
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
