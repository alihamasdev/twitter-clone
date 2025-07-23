import { NextRequest, NextResponse } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(_request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
	try {
		const { postId } = await params;

		const loggedInUser = await validateUser();

		await prisma.bookmark.upsert({
			where: { postId_userId: { postId, userId: loggedInUser.sub } },
			create: { postId, userId: loggedInUser.sub },
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

		const loggedInUser = await validateUser();

		await prisma.bookmark.delete({
			where: { postId_userId: { postId, userId: loggedInUser.sub } }
		});

		return NextResponse.json({ message: "Request accepted" });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
