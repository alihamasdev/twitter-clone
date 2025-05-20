"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root> & { defaultValue: string }) {
	return <TabsPrimitive.Root data-slot="tabs" className={cn("flex w-full flex-col gap-2", className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			className={cn("bg-background text-muted-foreground flex w-full items-center justify-center border-b", className)}
			{...props}
		/>
	);
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={cn(
				"data-[state=active]:text-foreground hover:bg-muted ring-ring/10 focus-visible:ring-ring relative inline-flex h-13 flex-1 cursor-pointer items-center justify-center gap-x-2 text-base font-bold whitespace-nowrap transition-colors duration-300 outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				"data-[state=active]:before:bg-accent data-[state=active]:before:absolute data-[state=active]:before:bottom-0 data-[state=active]:before:h-1 data-[state=active]:before:min-w-14 data-[state=active]:before:rounded-full",
				className
			)}
			{...props}
		/>
	);
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			data-slot="tabs-content"
			className={cn("flex-1 transition-colors aria-invalid:focus-visible:ring-0", className)}
			{...props}
		/>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
