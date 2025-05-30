import NumberFlow, { continuous } from "@number-flow/react";

import { cn } from "@/lib/utils";

export function NumberAnimation({ value, className, ...props }: React.ComponentProps<typeof NumberFlow>) {
	return (
		<NumberFlow
			className={cn("tabular-nums", className)}
			willChange={true}
			plugins={[continuous]}
			value={value}
			locales="en-US"
			{...props}
		/>
	);
}
