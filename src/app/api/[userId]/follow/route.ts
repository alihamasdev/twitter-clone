import { NextRequest, NextResponse } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(_request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
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

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
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
