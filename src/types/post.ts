import type { Post, Prisma } from "@prisma/client";

import { getUserDataWithFollowesInfo, type UserDataWithFollowInfo } from "@/types/user";

export function getPostDataInclude(loggedInUserId: string) {
	return {
		_count: postDataCounts,
		parent: postParentInfo,
		likes: getPostLikeInfo(loggedInUserId),
		reposts: getPostRepostInfo(loggedInUserId),
		bookmarks: getPostBookmarkInfo(loggedInUserId),
		user: { select: getUserDataWithFollowesInfo(loggedInUserId) }
	} satisfies Prisma.PostInclude;
}

export type PostPayload = Prisma.PostGetPayload<{
	include: ReturnType<typeof getPostDataInclude>;
}>;

export const postDataCounts = {
	select: {
		likes: true,
		reposts: true,
		replies: true
	}
} satisfies Prisma.PostInclude["_count"];

export type PostDataCounts = {
	[K in keyof typeof postDataCounts.select]: number;
};

export function getPostLikeInfo(loggedInUserId: string) {
	return {
		select: { id: true },
		where: { userId: loggedInUserId }
	} satisfies Prisma.Post$likesArgs;
}

export function getPostRepostInfo(loggedInUserId: string) {
	return {
		select: { id: true },
		where: { userId: loggedInUserId }
	} satisfies Prisma.Post$repostsArgs;
}

export function getPostBookmarkInfo(loggedInUserId: string) {
	return {
		select: { id: true },
		where: { userId: loggedInUserId }
	} satisfies Prisma.Post$bookmarksArgs;
}

export const postParentInfo = {
	select: {
		user: {
			select: {
				username: true
			}
		}
	}
};

export interface PostsCount {
	posts: number;
}

export interface PostData extends Post, PostDataCounts {
	isLiked: boolean;
	isReposted: boolean;
	isBookmarked: boolean;
	user: UserDataWithFollowInfo;
	parent: { user: { username: string } } | null;
}

export interface PostPage {
	posts: PostData[];
	nextCursor: string | number | null;
}
