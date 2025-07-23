import { NextRequest, NextResponse } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getFollowersInfo, type FollowerInfo } from "@/types/user";

export async function GET(_: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
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
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function POST(_: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
	try {
		const { userId } = await params;

		const loggedInUser = await validateUser();

		await prisma.follow.upsert({
			where: { followerId_followingId: { followingId: loggedInUser.sub, followerId: userId } },
			create: { followingId: loggedInUser.sub, followerId: userId },
			update: {}
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
	try {
		const { userId } = await params;

		const loggedInUser = await validateUser();

		await prisma.follow.deleteMany({ where: { followerId: userId, followingId: loggedInUser.sub } });

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
