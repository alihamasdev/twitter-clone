import { NextResponse, type NextRequest } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getFollowersInfo, type FollowerInfo } from "@/types/user";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
	try {
		const { userId } = await params;

		const loggedInUser = await validateUser();

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: getFollowersInfo(loggedInUser.sub)
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const data: FollowerInfo = {
			followers: user._count.followers,
			isFollowedByUser: !!user.followers.length
		};

		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
