import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
	try {
		const { userId } = await params;

		const posts = await prisma.post.count({
			where: { userId }
		});

		return NextResponse.json({ posts });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
