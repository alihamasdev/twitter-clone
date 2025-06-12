import { NextResponse, type NextRequest } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(_request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
	try {
		const { postId } = await params;

		const user = await validateUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		await prisma.like.upsert({
			where: { postId_userId: { postId, userId: user.id } },
			create: { postId, userId: user.id },
			update: {}
		});

		return NextResponse.json({ message: "Request accepted" });
	} catch (error) {
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
	try {
		const { postId } = await params;

		const user = await validateUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		await prisma.like.delete({
			where: { postId_userId: { postId, userId: user.id } }
		});

		return NextResponse.json({ message: "Request accepted" });
	} catch (error) {
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
