import { TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

export function Error({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="error"
			className={cn("flex-center text-muted-foreground mt-25 flex-col gap-y-3", className)}
			{...props}
		>
			<TriangleAlert className="size-12" />
			<p>Something went wrong, please try again</p>
		</div>
	);
}
