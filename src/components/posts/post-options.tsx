"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { useFollowerInfo, useFollowerMutation } from "@/hooks/use-follow";
import { useAuth } from "@/context/auth-context";
import { type UserDataWithFollowInfo } from "@/types/user";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItemIcon,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";

import { DeletePostDialog } from "../dialogs/delete-post.dialog";

interface PostOptionsProps extends React.ComponentProps<typeof DropdownMenuTrigger> {
	postId: string;
	user: UserDataWithFollowInfo;
}

export function PostOptions({ user, postId, className, ...props }: PostOptionsProps) {
	const { user: loginUser } = useAuth();
	const isCurrentUsersPost = user.id === loginUser.id;
	const followMutation = useFollowerMutation(user.id, user.isFollowedByUser);
	const { data } = useFollowerInfo(user.id, { followers: user.followers, isFollowedByUser: user.isFollowedByUser });

	const [open, setOpen] = useState(false);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger
					className={cn(
						"flex-center group hover:bg-blue/10 absolute top-2 right-3 size-7 cursor-pointer rounded-full",
						className
					)}
					{...props}
				>
					<Icon id="ellipsis" className="fill-muted-foreground group-hover:fill-blue size-4" />
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="min-w-70">
					{isCurrentUsersPost ? (
						<DropdownMenuItemIcon icon="delete" variant="destructive" onClick={() => setOpen(true)}>
							Delete Post
						</DropdownMenuItemIcon>
					) : (
						<DropdownMenuItemIcon
							icon={data.isFollowedByUser ? "unfollow" : "follow"}
							variant={data.isFollowedByUser ? "destructive" : "default"}
							onClick={() => followMutation()}
						>
							{data.isFollowedByUser ? `Unfollow @${user.username}` : `Follow @${user.username}`}
						</DropdownMenuItemIcon>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
			<DeletePostDialog postId={postId} open={open} onOpenChange={setOpen} />
		</>
	);
}
