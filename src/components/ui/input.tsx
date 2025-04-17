import { cn } from "@/lib/utils";

function Input({ placeholder = "", className, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			data-slot="input"
			placeholder={placeholder}
			className={cn(
				"border-input text-foreground peer h-15 w-full rounded-md border bg-transparent px-3 pt-5 text-base placeholder-transparent transition-colors outline-none",
				"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
				"focus:ring-ring focus:border-accent focus:ring-1",
				"aria-[invalid=true]:ring-destructive aria-invalid:border-destructive",
				className
			)}
			{...props}
		/>
	);
}

export { Input };
