import { useId } from "react";
import Form from "next/form";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

export function Search({ className, ...props }: React.ComponentProps<typeof Input>) {
	const id = useId();

	return (
		<section className="w-full">
			<Form action={`/explore`} className="relative w-full">
				<Input
					id={id}
					name="query"
					placeholder="Search"
					className={cn("peer/search placeholder:text-muted-foreground h-11 rounded-full py-0 pr-2 pl-11", className)}
					{...props}
				/>
				<label htmlFor={id} className="peer-focus/search:[&_svg]:fill-accent absolute top-1/2 left-4 -translate-y-1/2">
					<Icon id="search-solid" className="fill-muted-foreground size-4.5 transition-colors" />
				</label>
			</Form>
		</section>
	);
}
