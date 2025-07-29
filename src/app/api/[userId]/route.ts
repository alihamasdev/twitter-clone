import { NextRequest, NextResponse } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { type ProfilePageUser } from "@/types/user";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
	try {
		const { userId } = await params;

		const { sub: loginUserId } = await validateUser();

		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: {
				_count: { select: { posts: true, followers: true, following: true, reposts: true } },
				followers: { where: { followingId: loginUserId }, select: { id: true } }
			}
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const { _count, followers, ...profileUser } = user;

		const profile = {
			...profileUser,
			posts: _count.posts + _count.reposts,
			followers: _count.followers,
			following: _count.following,
			isFollowedByUser: !!followers.length
		} satisfies ProfilePageUser;

		return NextResponse.json(profile);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
