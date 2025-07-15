import { NextResponse, type NextRequest } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { type ProfilePageUser } from "@/types/user";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ username: string }> }) {
	try {
		const { username } = await params;

		const loggedInUser = await validateUser();
		if (!loggedInUser) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const user = await prisma.user.findUnique({
			where: { username },
			include: {
				_count: { select: { posts: true, followers: true, following: true } },
				followers: { where: { followingId: loggedInUser.id }, select: { id: true } }
			}
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const { _count, followers, ...profileUser } = user;

		const profile = {
			...profileUser,
			posts: _count.posts,
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
