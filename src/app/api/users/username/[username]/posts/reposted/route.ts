import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PAGE_SIZE } from "@/utils/contants";
import { getPostCounts, getPostLikeInfo, getPostRepostInfo, PostPage } from "@/types/post";
import { getUserDataWithFollowesInfo } from "@/types/user";

export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string }> }) {
	try {
		const { username } = await params;
		const cursor = request.nextUrl.searchParams.get("cursor") || undefined;

		const loggedInUser = await validateUser();

		const user = await prisma.user.findUnique({ where: { username }, select: { id: true } });
		if (!user) {
			return notFound();
		}

		const postPayload = await prisma.repost.findMany({
			where: { userId: user.id },
			orderBy: { createdAt: "desc" },
			take: PAGE_SIZE + 1,
			cursor: cursor ? { id: Number(cursor) } : undefined,
			select: {
				id: true,
				user: { select: getUserDataWithFollowesInfo(loggedInUser.sub) },
				post: {
					include: { ...getPostCounts(), ...getPostLikeInfo(loggedInUser.sub), ...getPostRepostInfo(loggedInUser.sub) }
				}
			}
		});

		const posts = postPayload.map(({ post, user }) => ({
			id: post.id,
			content: post.content,
			createdAt: post.createdAt,
			userId: post.userId,
			user: {
				id: user.id,
				name: user.name,
				username: user.username,
				avatarUrl: user.avatarUrl,
				followers: user._count.followers,
				isFollowedByUser: !!user.followers.length
			},
			likes: post._count.likes,
			reposts: post._count.reposts,
			isBookmarked: true,
			isLiked: !!post.likes.length,
			isReposted: !!post.reposts.length
		}));

		const nextCursor = posts.length > PAGE_SIZE ? postPayload[PAGE_SIZE].id : null;

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
