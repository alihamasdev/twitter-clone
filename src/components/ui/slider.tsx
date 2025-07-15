"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
	showTooltip?: boolean;
	tooltipContent?: (value: number) => React.ReactNode;
}) {
	const [internalValues, setInternalValues] = React.useState<number[]>(
		Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]
	);

	React.useEffect(() => {
		if (value !== undefined) {
			setInternalValues(Array.isArray(value) ? value : [value]);
		}
	}, [value]);

	const handleValueChange = (newValue: number[]) => {
		setInternalValues(newValue);
		props.onValueChange?.(newValue);
	};

	return (
		<SliderPrimitive.Root
			data-slot="slider"
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			className={cn(
				"relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
				className
			)}
			onValueChange={handleValueChange}
			{...props}
		>
			<SliderPrimitive.Track
				data-slot="slider-track"
				className={cn(
					"bg-accent/40 relative grow cursor-pointer overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
				)}
			>
				<SliderPrimitive.Range
					data-slot="slider-range"
					className={cn("bg-accent absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full")}
				/>
			</SliderPrimitive.Track>
			{Array.from({ length: internalValues.length }, (_, index) => (
				<SliderPrimitive.Thumb
					key={index}
					data-slot="slider-thumb"
					className="border-accent bg-accent ring-ring/30 block size-4 shrink-0 cursor-pointer rounded-full border transition-[color,box-shadow] outline-none hover:ring-4 disabled:pointer-events-none disabled:opacity-50"
				/>
			))}
		</SliderPrimitive.Root>
	);
}

export { Slider };
