import type { Post, Prisma } from "@prisma/client";

import { getFollowersInfo, userDataSelect, type UserDataWithFollowInfo } from "./user";

export function getPostDataInclude(loggedInUserId: string) {
	return {
		_count: { select: { likes: true, reposts: true } },
		likes: { select: { id: true }, where: { userId: loggedInUserId } },
		reposts: { select: { id: true }, where: { userId: loggedInUserId } },
		bookmarks: { select: { id: true }, where: { userId: loggedInUserId } },
		user: { select: { ...userDataSelect, ...getFollowersInfo(loggedInUserId) } }
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
	posts: PostPayload[];
	nextCursor: string | null;
}
