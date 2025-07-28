import { NextRequest, NextResponse } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
	try {
		const { postId } = await params;

		const { sub: loginUserId } = await validateUser();

		await prisma.post.delete({ where: { id: postId, userId: loginUserId } });

		return NextResponse.json({ message: "Post Deleted Successfully" });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
