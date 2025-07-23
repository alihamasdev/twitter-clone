import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function GET(_: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
	try {
		const { userId } = await params;

		const followingCount = await prisma.follow.count({
			where: { followingId: userId }
		});

		return NextResponse.json({ following: followingCount });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
