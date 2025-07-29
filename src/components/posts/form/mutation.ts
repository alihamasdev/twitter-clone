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
			// Adding post to feeed
			await optimisticPostListUpdate([`feed`], (pages, firstPage) => {
				return [{ ...firstPage, posts: [newPost, ...firstPage.posts] }, ...pages.slice(1)];
			});

			if (!newPost.parentId) {
				// Adding post to user profile posts
				await optimisticPostListUpdate([`posts`, user.id], (pages, firstPage) => {
					return [{ ...firstPage, posts: [newPost, ...firstPage.posts] }, ...pages.slice(1)];
				});
			} else {
				// Adding post to user profile replies
				await optimisticPostListUpdate([`replies`, user.id], (pages, firstPage) => {
					return [{ ...firstPage, posts: [newPost, ...firstPage.posts] }, ...pages.slice(1)];
				});
				// Addingg post to parent-post replies
				await optimisticPostListUpdate([`replies`, newPost.parentId], (pages, firstPage) => {
					return [{ ...firstPage, posts: [newPost, ...firstPage.posts] }, ...pages.slice(1)];
				});
			}

			// Updating parent-post replies count
			await optimisticUpdate<PostData>([`post`, newPost.parentId], (oldData) =>
				oldData ? { ...oldData, replies: oldData.replies + 1 } : oldData
			);

			// Updating user posts count
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
