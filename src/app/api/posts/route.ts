import { NextResponse, type NextRequest } from "next/server";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PAGE_SIZE } from "@/utils/contants";
import { getPostDataInclude, PostPage, PostPayload } from "@/types/post";

export async function GET(request: NextRequest) {
	try {
		const cursor = request.nextUrl.searchParams.get("cursor") || undefined;

		const user = await validateUser();
		if (!user) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		const query = getPostDataInclude(user.id);

		const posts = (await prisma.post.findMany({
			include: query,
			orderBy: { createdAt: "desc" },
			take: PAGE_SIZE + 1,
			cursor: cursor ? { id: cursor } : undefined
		})) satisfies PostPayload[];

		const nextCursor = posts.length > PAGE_SIZE ? posts[PAGE_SIZE].id : null;

		const data: PostPage = {
			posts: posts.slice(0, PAGE_SIZE),
			nextCursor
		};

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
