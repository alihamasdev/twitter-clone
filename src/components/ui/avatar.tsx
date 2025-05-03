"use client";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
import { UserRound } from "lucide-react";

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
			className={cn("aspect-square size-full transition-[opacity] duration-300 hover:opacity-80", className)}
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
