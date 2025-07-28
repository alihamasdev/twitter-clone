"use client";

import { useMutation, useQuery, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { axios } from "@/lib/axios";
import { optimiticUpdate } from "@/lib/tanstack/optimistic-update";
import { useAuth } from "@/context/auth-context";
import type { FollowerInfo, FollowingInfo } from "@/types/user";

export function useFollowerInfo(userId: string, initialState: FollowerInfo) {
	return useQuery({
		queryKey: [`follower-info`, userId],
		queryFn: () => axios.get<FollowerInfo>(`/api/${userId}/followers/info`).then((res) => res.data),
		initialData: initialState,
		staleTime: Infinity
	});
}

export function useFollowingInfo(userId: string, initialState: FollowingInfo) {
	return useQuery({
		queryKey: [`following-count`, userId],
		queryFn: () => axios.get<{ following: number }>(`/api/${userId}/following/info`).then((res) => res.data),
		initialData: initialState,
		staleTime: Infinity
	});
}

export function useFollowerMutation(userId: string, isFollowing: boolean) {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const followQueryKey: QueryKey = [`follower-info`, userId];
	const followingQueryKey: QueryKey = [`following-count`, user.id];

	return useMutation({
		mutationFn: () =>
			isFollowing
				? axios.delete(`/api/actions/user/${userId}/follow`)
				: axios.post(`/api/actions/user/${userId}/follow`),
		onMutate: async () => {
			const [previousFollowers] = await optimiticUpdate<FollowerInfo>(followQueryKey, (oldData) => ({
				followers: (oldData?.followers || 0) + (oldData?.isFollowedByUser ? -1 : 1),
				isFollowedByUser: !oldData?.isFollowedByUser
			}));

			const [previousFollowing] = await optimiticUpdate<FollowingInfo>(followingQueryKey, (oldData) => ({
				following: (oldData?.following || 0) + (previousFollowers?.isFollowedByUser ? -1 : 1)
			}));

			return { previousFollowers, previousFollowing };
		},
		onError: (error, _variables, context) => {
			console.error(error);
			toast.error("Something went wrong, please try again.");
			queryClient.setQueryData(followQueryKey, context?.previousFollowers);
			queryClient.setQueryData(followingQueryKey, context?.previousFollowing);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [`following`, user.id] });
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: followQueryKey });
			queryClient.invalidateQueries({ queryKey: followingQueryKey });
		}
	});
}
