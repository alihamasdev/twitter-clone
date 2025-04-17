import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, placeholder = "", ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			placeholder={placeholder}
			className={cn(
				"border-input peer placeholder:text-muted-foreground field-sizing-content max-h-100 min-h-16 w-full resize-none rounded-md border bg-transparent px-3 pt-9 pb-3 text-base transition-colors outline-none",
				"disabled:cursor-not-allowed disabled:opacity-50",
				"focus:ring-ring focus:border-accent focus:ring-1",
				"aria-invalid:border-destructive aria-invalid:ring-destructive",
				className
			)}
			{...props}
		/>
	);
}

export { Textarea };
