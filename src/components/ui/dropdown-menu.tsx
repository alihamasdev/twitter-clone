"use client";
import { useRouter } from "next/navigation";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { cn } from "@/lib/utils";
import { Icon, type IconId } from "@/components/ui/icon";

function DropdownMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
	return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
	return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({
	className,
	sideOffset = 4,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
	return (
		<DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal">
			<DropdownMenuPrimitive.Content
				data-slot="dropdown-menu-content"
				sideOffset={sideOffset}
				className={cn(
					"bg-popover text-popover-foreground z-50 overflow-hidden rounded-xl border shadow-(--shadow)",
					"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
					"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
					"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					className
				)}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	);
}

interface DropdownMenuItemProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Item> {
	variant?: "default" | "destructive";
	pushUrl?: string;
}

function DropdownMenuItem({ variant = "default", pushUrl, className, ...props }: DropdownMenuItemProps) {
	const router = useRouter();
	return (
		<DropdownMenuPrimitive.Item
			data-slot="dropdown-menu-item"
			data-variant={variant}
			onClick={() => pushUrl && router.push(pushUrl)}
			className={cn(
				"hover:bg-muted relative flex cursor-pointer items-center gap-x-2.5 px-4 py-3 text-base font-bold transition-colors select-none",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				"[&_svg]:pointer-events-none [&_svg]:shrink-0",
				"data-[variant=destructive]:text-destructive data-[variant=destructive]:*:[svg]:!fill-destructive",
				className
			)}
			{...props}
		/>
	);
}

function DropdownMenuItemIcon({
	icon,
	children,
	...props
}: React.ComponentProps<typeof DropdownMenuItem> & { icon?: IconId }) {
	return (
		<DropdownMenuItem {...props}>
			{icon && <Icon id={icon} />}
			{children}
		</DropdownMenuItem>
	);
}

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuItemIcon };
