"use client";

import { useMutation, useQuery, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { ProfileData } from "@/types/user";
import { checkFollowStatus, toggleFollowAction } from "@/actions/user/follow";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface FollowButtonProps extends React.ComponentProps<typeof Button> {
	isFollowing: boolean;
	userId: string;
}

export function FollowButton({ isFollowing, userId, size = "sm", className, ...props }: FollowButtonProps) {
	const queryClient = useQueryClient();
	const queryKey: QueryKey = [`follow`, userId];

	const { data: hasFollowing } = useQuery({
		queryKey,
		queryFn: () => checkFollowStatus(userId),
		initialData: isFollowing,
		staleTime: Infinity
	});

	const { mutate } = useMutation({
		mutationKey: queryKey,
		mutationFn: () => toggleFollowAction(userId),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });
			const previousState = queryClient.getQueryData<boolean>(queryKey);
			queryClient.setQueryData<boolean>(queryKey, !previousState);
			return { previousState };
		},
		onError(error, _, context) {
			queryClient.setQueryData<boolean>(queryKey, context?.previousState);
			console.log("Error mutating follow status:", error);
			toast.error("An error occurred while updating follow status.");
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey })
	});

	return (
		<Button
			data-size={size}
			size={size}
			variant={hasFollowing ? "outline" : "default"}
			onClick={() => mutate()}
			className={cn(
				hasFollowing &&
					"group/follow hover:border-destructive/70 hover:text-destructive hover:bg-destructive/10 min-w-26 transition-all data-[size=sm]:min-w-23.5",
				className
			)}
			{...props}
		>
			{hasFollowing ? (
				<span className="after:content-['Following'] group-hover/follow:after:content-['Unfollow']" />
			) : (
				"Follow"
			)}
		</Button>
	);
}
