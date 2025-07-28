"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { optimisticPostListUpdate } from "@/lib/tanstack/optimistic-update";
import { useAuth } from "@/context/auth-context";
import { type PostData } from "@/types/post";

import { createPost } from "./action";

export function useSubmitPostMutation() {
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: createPost,
		onSuccess: async (data) => {
			const newPost = {
				...data,
				user: { ...user, isFollowedByUser: false, followers: 0 },
				isBookmarked: false,
				isLiked: false,
				isReposted: false,
				replies: 0,
				likes: 0,
				reposts: 0
			} satisfies PostData;

			await optimisticPostListUpdate([`feed`], (pages, firstPage) => {
				return [{ ...firstPage, posts: [newPost, ...firstPage.posts] }, ...pages.slice(1)];
			});

			await optimisticPostListUpdate([`posts`, user.id], (pages, firstPage) => {
				return [{ ...firstPage, posts: [newPost, ...firstPage.posts] }, ...pages.slice(1)];
			});

			toast.success("You post has been created");
		},
		onError(error) {
			console.error(error);
			toast.error("Something went wrong while creating post");
		},
		onSettled(data) {
			queryClient.invalidateQueries({ queryKey: [`post`, data?.id] });
		}
	});

	return mutation;
}
