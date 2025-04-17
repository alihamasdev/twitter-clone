import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div data-slot="skeleton" className={cn("bg-muted h-4 w-full animate-pulse rounded-md", className)} {...props} />
	);
}

export { Skeleton };
