"use client";

import { UserRound } from "lucide-react";
import { Avatar as AvatarPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			className={cn(
				"bg-image relative flex size-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full",
				className
			)}
			{...props}
		/>
	);
}

function AvatarImage({ className, loading = "lazy", ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			loading={loading}
			width={40}
			height={40}
			className={cn("aspect-square size-full transition-[opacity] duration-300 hover:opacity-80", className)}
			alt="avatar"
			{...props}
		/>
	);
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
	return (
		<AvatarPrimitive.Fallback data-slot="avatar-fallback" asChild {...props}>
			<UserRound className={cn("size-1/2", className)} />
		</AvatarPrimitive.Fallback>
	);
}

export { Avatar, AvatarImage, AvatarFallback };
