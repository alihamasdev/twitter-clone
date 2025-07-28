import { NextResponse, type NextRequest } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PAGE_SIZE } from "@/utils/contants";
import { getUserDataWithFollowesInfo, type UserPage } from "@/types/user";

export async function GET(request: NextRequest) {
	try {
		const cursor = request.nextUrl.searchParams.get("cursor") || undefined;

		const { sub: loginUserId } = await validateUser();

		const usersPayload = await prisma.user.findMany({
			orderBy: { createdAt: "desc" },
			where: { id: { not: loginUserId } },
			take: PAGE_SIZE + 1,
			cursor: cursor ? { id: cursor } : undefined,
			select: getUserDataWithFollowesInfo(loginUserId)
		});

		const users = usersPayload.map(({ followers, _count, ...user }) => ({
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
