import { NextRequest, NextResponse } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PAGE_SIZE } from "@/utils/contants";
import { getUserDataWithFollowesInfo, type UserDataWithFollowInfo, type UserPage } from "@/types/user";

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
	try {
		const { userId } = await params;
		const cursor = request.nextUrl.searchParams.get("cursor") || undefined;

		const loggedInUser = await validateUser();

		const usersPayload = await prisma.follow.findMany({
			where: { followingId: userId },
			orderBy: { createdAt: "desc" },
			take: PAGE_SIZE + 1,
			cursor: cursor ? { id: Number(cursor) } : undefined,
			select: { id: true, follower: { select: getUserDataWithFollowesInfo(loggedInUser.sub) } }
		});

		const users: UserDataWithFollowInfo[] = usersPayload.map(({ follower: { _count, followers, ...user } }) => ({
			...user,
			followers: _count.followers,
			isFollowedByUser: !!followers.length
		}));

		const nextCursor = users.length > PAGE_SIZE ? usersPayload[PAGE_SIZE].id : null;

		const data: UserPage = {
			users: users.slice(0, PAGE_SIZE),
			nextCursor
		};

		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
