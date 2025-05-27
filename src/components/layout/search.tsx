import { useId } from "react";
import { Label } from "@radix-ui/react-label";

import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

export function Search() {
	const id = useId();
	return (
		<section className="w-full">
			<div className="relative w-full">
				<Input
					id={id}
					placeholder="Search"
					className="peer/search placeholder:text-muted-foreground h-11 rounded-full py-0 pr-2 pl-11"
				/>
				<Label htmlFor={id} className="peer-focus/search:[&_svg]:fill-accent absolute top-1/2 left-4 -translate-y-1/2">
					<Icon id="search" className="fill-muted-foreground size-4.5 transition-colors" />
				</Label>
			</div>
		</section>
	);
}
