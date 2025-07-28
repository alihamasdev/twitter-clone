"use client";

import { useMutation, useQuery, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { axios } from "@/lib/axios";
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
			await queryClient.cancelQueries({ queryKey: followQueryKey });

			const previousState = queryClient.getQueryData<FollowerInfo>(followQueryKey);
			queryClient.setQueryData<FollowerInfo>(followQueryKey, () => ({
				followers: (previousState?.followers || 0) + (previousState?.isFollowedByUser ? -1 : 1),
				isFollowedByUser: !previousState?.isFollowedByUser
			}));

			const previousFollowing = queryClient.getQueryData<FollowingInfo>(followingQueryKey);
			queryClient.setQueryData<FollowingInfo>(followingQueryKey, () => ({
				following: (previousFollowing?.following || 0) + (previousState?.isFollowedByUser ? -1 : 1)
			}));

			return { previousState, previousFollowing };
		},
		onError: (error, _, context) => {
			console.error(error);
			queryClient.setQueryData(followQueryKey, context?.previousState);
			queryClient.setQueryData(followingQueryKey, context?.previousFollowing);
			toast.error("Something went wrong, please try again.");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: followQueryKey });
			queryClient.invalidateQueries({ queryKey: followingQueryKey });
			queryClient.invalidateQueries({ queryKey: [`following`, user.id] });
		}
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
