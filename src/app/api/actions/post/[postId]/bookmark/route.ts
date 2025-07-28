import { NextRequest, NextResponse } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(_request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
	try {
		const { postId } = await params;

		const { sub: loginUserId } = await validateUser();

		await prisma.bookmark.upsert({
			where: { postId_userId: { postId, userId: loginUserId } },
			create: { postId, userId: loginUserId },
			update: {}
		});

		return NextResponse.json({ message: "Request accepted" });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
	try {
		const { postId } = await params;

		const { sub: loginUserId } = await validateUser();

		await prisma.bookmark.delete({ where: { postId_userId: { postId, userId: loginUserId } } });

		return NextResponse.json({ message: "Request accepted" });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
