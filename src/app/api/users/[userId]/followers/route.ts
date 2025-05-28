import { NextResponse, type NextRequest } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getFollowersInfo, type FollowerInfo } from "@/types/user";

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
	try {
		const { userId } = await params;
		const authorization = request.headers.get("Authorization") || undefined;

		const loggedInUser = await validateUser(authorization);
		if (!loggedInUser) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: getFollowersInfo(loggedInUser.id)
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

export async function POST(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
	try {
		const { userId } = await params;
		const authorization = request.headers.get("Authorization") || undefined;

		const loggedInUser = await validateUser(authorization);
		if (!loggedInUser) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		await prisma.follow.upsert({
			where: { followerId_followingId: { followingId: loggedInUser.id, followerId: userId } },
			create: { followingId: loggedInUser.id, followerId: userId },
			update: {}
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
	try {
		const { userId } = await params;
		const authorization = request.headers.get("Authorization") || undefined;

		const loggedInUser = await validateUser(authorization);
		if (!loggedInUser) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		await prisma.follow.deleteMany({ where: { followerId: userId, followingId: loggedInUser.id } });

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
