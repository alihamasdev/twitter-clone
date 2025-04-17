import { cn } from "@/lib/utils";

export function Spinner({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="spinner"
			className={cn(
				"!border-t-accent border-muted mx-auto mt-25 size-6.5 animate-spin rounded-full border-4",
				className
			)}
			{...props}
		/>
	);
}
