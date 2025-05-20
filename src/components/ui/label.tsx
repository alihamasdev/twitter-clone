"use client";

import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
	return (
		<LabelPrimitive.Root
			data-slot="label"
			className={cn(
				"text-muted-foreground absolute top-1/2 left-3 -translate-y-5 cursor-text text-left text-sm font-medium transition-all select-none",
				"peer-focus:text-accent peer-focus:-translate-y-5 peer-focus:text-sm",
				"peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base",
				className
			)}
			{...props}
		/>
	);
}

export { Label };
