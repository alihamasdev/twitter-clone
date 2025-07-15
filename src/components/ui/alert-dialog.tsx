"use client";

import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { DialogFooter, DialogHeader, DialogIcon } from "@/components/ui/dialog";

function AlertDialog({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
	return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
	return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

function AlertDialogOverlay({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
	return (
		<AlertDialogPrimitive.Overlay
			data-slot="alert-dialog-overlay"
			className={cn(
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-overlay fixed inset-0 z-50",
				className
			)}
			{...props}
		/>
	);
}

function AlertDialogContent({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
	return (
		<AlertDialogPrimitive.Portal data-slot="alert-dialog-portal">
			<AlertDialogOverlay />
			<AlertDialogPrimitive.Content
				data-slot="alert-dialog-content"
				className={cn(
					"bg-background fixed top-1/2 left-1/2 z-50 grid max-h-[90dvh] w-full max-w-150 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl outline-none",
					"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-300",
					className
				)}
				{...props}
			/>
		</AlertDialogPrimitive.Portal>
	);
}

function AlertDialogHeader({ ...props }: React.ComponentProps<typeof DialogHeader>) {
	return <DialogHeader data-slot="alert-dialog-header" {...props} />;
}

function AlertDialogFooter({ ...props }: React.ComponentProps<typeof DialogFooter>) {
	return <DialogFooter data-slot="alert-dialog-footer" {...props} />;
}

function AlertDialogIcon({ ...props }: React.ComponentProps<typeof DialogIcon>) {
	return <DialogIcon data-slot="alert-dialog-icon" {...props} />;
}

function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
	return (
		<AlertDialogPrimitive.Title
			data-slot="alert-dialog-title"
			className={cn("text-xl font-extrabold", className)}
			{...props}
		/>
	);
}

function AlertDialogDescription({
	className,
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
	return (
		<AlertDialogPrimitive.Description
			data-slot="alert-dialog-description"
			className={cn("text-muted-foreground text-base text-pretty", className)}
			{...props}
		/>
	);
}

function AlertDialogAction({
	children,
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> & ButtonProps) {
	return (
		<AlertDialogPrimitive.Action data-slot="alert-dialog-action" asChild>
			<Button {...props}>{children}</Button>
		</AlertDialogPrimitive.Action>
	);
}

function AlertDialogCancel({
	children,
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> & ButtonProps) {
	return (
		<AlertDialogPrimitive.Cancel data-slot="alert-dialog-cancel" asChild>
			<Button {...props}>{children}</Button>
		</AlertDialogPrimitive.Cancel>
	);
}

export {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogIcon,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel
};
