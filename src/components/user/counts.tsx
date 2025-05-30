"use client";

import { Fragment } from "react";

import { useFollowerInfo, useFollowingInfo } from "@/hooks/use-follow";
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
