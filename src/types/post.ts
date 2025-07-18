import type { Post, Prisma } from "@prisma/client";

import { getUserDataWithFollowesInfo, type UserDataWithFollowInfo } from "./user";

export function getPostDataInclude(loggedInUserId: string) {
	return {
		_count: { select: { likes: true, reposts: true } },
		likes: { select: { id: true }, where: { userId: loggedInUserId } },
		reposts: { select: { id: true }, where: { userId: loggedInUserId } },
		bookmarks: { select: { id: true }, where: { userId: loggedInUserId } },
		user: { select: getUserDataWithFollowesInfo(loggedInUserId) }
	} satisfies Prisma.PostInclude;
}

export function getPostCounts() {
	return {
		_count: { select: { likes: true, reposts: true } }
	} satisfies Prisma.PostInclude;
}

export function getPostLikeInfo(loggedInUserId: string) {
	return {
		likes: { select: { id: true }, where: { userId: loggedInUserId } }
	} satisfies Prisma.PostInclude;
}

export function getPostRepostInfo(loggedInUserId: string) {
	return {
		reposts: { select: { id: true }, where: { userId: loggedInUserId } }
	} satisfies Prisma.PostInclude;
}

export function getPostBookmarkInfo(loggedInUserId: string) {
	return {
		bookmarks: { select: { id: true }, where: { userId: loggedInUserId } }
	} satisfies Prisma.PostInclude;
}

export type PostPayload = Prisma.PostGetPayload<{
	include: ReturnType<typeof getPostDataInclude>;
}>;

export interface PostData extends Post {
	likes: number;
	reposts: number;
	isLiked: boolean;
	isReposted: boolean;
	isBookmarked: boolean;
	user: UserDataWithFollowInfo;
}

export interface PostPage {
	posts: PostData[];
	nextCursor: string | number | null;
}
