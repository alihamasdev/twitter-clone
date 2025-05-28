"use client";

import { useMutation, useQuery, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { axios } from "@/lib/axios";
import { FollowerInfo } from "@/types/user";

export function useFollowerInfo(userId: string, initialState: FollowerInfo) {
	const query = useQuery({
		queryKey: [`follower-info`, userId],
		queryFn: async () => {
			const { data } = await axios.get<FollowerInfo>(`/api/users/${userId}/followers`);
			return data;
		},
		initialData: initialState,
		staleTime: Infinity
	});

	return query;
}

export function useFollowerMutation(userId: string, isFollowing: boolean) {
	const queryClient = useQueryClient();
	const queryKey: QueryKey = [`follower-info`, userId];

	const { mutate } = useMutation({
		mutationFn: () =>
			isFollowing ? axios.delete(`/api/users/${userId}/followers`) : axios.post(`/api/users/${userId}/followers`),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });

			const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

			queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
				followers: (previousState?.followers || 0) + (previousState?.isFollowedByUser ? -1 : 1),
				isFollowedByUser: !previousState?.isFollowedByUser
			}));

			return previousState;
		},
		onError: (error, _, context) => {
			console.error(error);
			queryClient.setQueryData(queryKey, context);
			toast.error("Something went wrong, please try again.");
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey })
	});

	return mutate;
}
