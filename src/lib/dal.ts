"use server";

import { cache } from "react";
import { notFound } from "next/navigation";

import { validateUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPostDataInclude, type PostData, type PostPayload } from "@/types/post";
import { formatUserData, getUserDataWithFollowesInfo, userDataSelect } from "@/types/user";
import type { UserData, UserDataWithFollowInfo } from "@/types/user";

/** Gets currently loggedIn user from database for global state `AuthContext` */
export const getLoginUserData = cache(async (): Promise<UserData | null> => {
	const { sub: loginUserId } = await validateUser();

	const data = await prisma.user.findUnique({
		where: { id: loginUserId },
		select: userDataSelect
	});

	return data;
});

export const getUsersList = cache(async (limit = 4) => {
	const { sub: loginUserId } = await validateUser();

	const data = await prisma.user.findMany({
		take: limit,
		where: { NOT: { id: loginUserId } },
		select: getUserDataWithFollowesInfo(loginUserId)
	});

	const dataList: UserDataWithFollowInfo[] = data.map(({ _count, followers, ...data }) => {
		return {
			...data,
			followers: _count.followers,
			isFollowedByUser: !!followers.length
		};
	});

	return dataList;
});

export const getUserByUsername = cache(async (username: string) => {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true, name: true }
	});

	if (!user) {
		return notFound();
	}

	return { userId: user.id, name: user.name };
});

export const getPostById = cache(async (postId: string): Promise<PostData> => {
	const { sub: loginUserId } = await validateUser();

	const postPayload = (await prisma.post.findUnique({
		where: { id: postId },
		include: getPostDataInclude(loginUserId)
	})) satisfies PostPayload | null;

	if (!postPayload) {
		return notFound();
	}

	const { user, _count, bookmarks, likes, reposts, ...post } = postPayload;

	return {
		...post,
		..._count,
		user: formatUserData(user),
		isLiked: !!likes.length,
		isReposted: !!reposts.length,
		isBookmarked: !!bookmarks.length
	};
});

type ParentPostByIdReturn = Promise<{ post: PostData; parentPosts: PostData[] }>;

export const getParentPostsById = cache(async (postId: string): ParentPostByIdReturn => {
	const post = await getPostById(postId);

	if (!post.parentId) {
		return { post, parentPosts: [] };
	}

	const parentPosts = [];
	let currentPostId: string | null = postId;

	while (currentPostId) {
		const parentPost = await getPostById(currentPostId);
		if (!parentPost) break;

		parentPosts.push(parentPost);
		currentPostId = parentPost.parentId;
	}

	return { post, parentPosts: parentPosts.reverse() };
});
