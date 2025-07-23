"use client";

import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			role="overlay"
			data-slot="dialog-overlay"
			className={cn(
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-overlay fixed inset-0 z-50",
				className
			)}
			{...props}
		/>
	);
}

function DialogContent({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
	return (
		<DialogPrimitive.Portal data-slot="dialog-portal">
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cn(
					"bg-background fixed top-1/2 left-1/2 z-50 grid max-h-[90dvh] w-full max-w-150 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl outline-none",
					"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-300",
					className
				)}
				{...props}
			/>
		</DialogPrimitive.Portal>
	);
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-header"
			className={cn("mb-4 flex flex-col gap-4 text-center sm:text-left", className)}
			{...props}
		/>
	);
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="dialog-footer" className={cn("mt-4 flex flex-col gap-4", className)} {...props} />;
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title data-slot="dialog-title" className={cn("text-xl font-extrabold", className)} {...props} />
	);
}

function DialogIcon({ id = "twitter", className, ...props }: Partial<React.ComponentProps<typeof Icon>>) {
	return <Icon data-slot="dialog-icon" id={id} className={cn("mx-auto size-10", className)} {...props} />;
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn("text-muted-foreground text-base text-pretty", className)}
			{...props}
		/>
	);
}

function DialogClose({ children, ...props }: React.ComponentProps<typeof DialogPrimitive.Close> & ButtonProps) {
	return (
		<DialogPrimitive.Close data-slot="dialog-close" asChild>
			<Button {...props}>{children}</Button>
		</DialogPrimitive.Close>
	);
}

export {
	Dialog,
	DialogTrigger,
	DialogOverlay,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogIcon,
	DialogTitle,
	DialogDescription,
	DialogClose
};
