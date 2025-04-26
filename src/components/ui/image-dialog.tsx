"use client";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";

function ImageDialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot="image-dialog" {...props} />;
}

function ImageDialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return <DialogPrimitive.Trigger data-slot="image-dialog-trigger" {...props} />;
}

function ImageDialogContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
	return (
		<DialogPrimitive.Portal data-slot="image-dialog-portal">
			<DialogPrimitive.Overlay
				data-slot="image-dialog-overlay"
				className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/90"
			/>
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cn(
					"fixed top-1/2 left-1/2 z-50 grid -translate-x-1/2 -translate-y-1/2",
					"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-300",
					className
				)}
				{...props}
			>
				{children}
				<DialogPrimitive.Title hidden />
				<DialogPrimitive.Description hidden />
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	);
}

export { ImageDialog, ImageDialogTrigger, ImageDialogContent };
