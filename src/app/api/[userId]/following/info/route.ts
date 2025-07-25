import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
	try {
		const { userId } = await params;

		const following = await prisma.follow.count({
			where: { followingId: userId }
		});

		return NextResponse.json({ following });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
