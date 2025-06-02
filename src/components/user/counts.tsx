"use client";

import { Fragment } from "react";

import { useFollowerInfo, useFollowingInfo } from "@/hooks/use-follow";
import { useAuth } from "@/context/auth-context";
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
	initialState: FollowingInfo;
	isCurrentUser: boolean;
}

export function FollowingCount({ initialState, isCurrentUser }: FollowingCountProps) {
	const { user } = useAuth();
	const { data } = useFollowingInfo(user.id, initialState);

	return (
		<Fragment>
			<NumberAnimation value={isCurrentUser ? data.following : initialState.following} />
			<span className="text-muted-foreground pl-1">Following</span>
		</Fragment>
	);
}
