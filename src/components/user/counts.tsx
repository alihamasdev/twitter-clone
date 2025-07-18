"use client";

import { Fragment } from "react";

import { useFollowerInfo, useFollowingInfo } from "@/hooks/use-follow";
import { usePostsCount } from "@/hooks/use-posts-count";
import type { FollowerInfo, FollowingInfo } from "@/types/user";
import { NumberAnimation } from "@/components/number-animation";

interface FollowersCountProps {
	userId: string;
	initialState: FollowerInfo;
}

export function FollowersCount({ userId, initialState }: FollowersCountProps) {
	const { data } = useFollowerInfo(userId, initialState);

	return (
		<Fragment>
			<NumberAnimation value={data.followers} />
			<span className="text-muted-foreground pl-1">{data.followers === 1 ? `Follower` : `Followers`}</span>
		</Fragment>
	);
}

interface FollowingCountProps {
	userId: string;
	initialState: FollowingInfo;
}

export function FollowingCount({ userId, initialState }: FollowingCountProps) {
	const { data } = useFollowingInfo(userId, initialState);

	return (
		<Fragment>
			<NumberAnimation value={data.following} />
			<span className="text-muted-foreground pl-1">Following</span>
		</Fragment>
	);
}

export function PostsCount({ userId, initialState }: { userId: string; initialState: { posts: number } }) {
	const { data } = usePostsCount(userId, initialState);

	return (
		<Fragment>
			<NumberAnimation value={data.posts} />
			<span className="pl-1">{data.posts === 1 ? `post` : `posts`}</span>
		</Fragment>
	);
}
