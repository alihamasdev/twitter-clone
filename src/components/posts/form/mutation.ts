"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { optimisticPostListUpdate, optimisticUpdate } from "@/lib/tanstack/optimistic-update";
import { useAuth } from "@/context/auth-context";
import { type PostData, type PostsCount } from "@/types/post";

import { createPost } from "./action";

export function useSubmitPostMutation() {
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: createPost,
		onSuccess: async (newPost) => {
			await optimisticPostListUpdate([`feed`], (pages, firstPage) => {
				return [{ ...firstPage, posts: [newPost, ...firstPage.posts] }, ...pages.slice(1)];
			});

			if (!newPost.parentId) {
				await optimisticPostListUpdate([`posts`, user.id], (pages, firstPage) => {
					return [{ ...firstPage, posts: [newPost, ...firstPage.posts] }, ...pages.slice(1)];
				});
			} else {
				await optimisticPostListUpdate([`replies`, user.id], (pages, firstPage) => {
					return [{ ...firstPage, posts: [newPost, ...firstPage.posts] }, ...pages.slice(1)];
				});
			}

			await optimisticUpdate<PostData>([`post`, newPost.id], (oldData) =>
				oldData ? { ...oldData, replies: oldData.replies + 1 } : oldData
			);

			await optimisticUpdate<PostsCount>([`posts-count`, user.id], (oldData) => ({
				posts: (oldData?.posts || 0) + 1
			}));

			toast.success(`You ${newPost.parentId ? "reply" : "post"} has been sent`);

			queryClient.invalidateQueries({ queryKey: [`post`, newPost.id] });
		},
		onError(error, { parentId }) {
			console.error(error);
			toast.error(`Somethingg went wrong while seding your ${parentId ? "reply" : "post"}`);
		}
	});

	return mutation;
}
