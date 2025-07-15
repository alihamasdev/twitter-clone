"use client";

import { Fragment, useId } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { accentColors, useTheme } from "@/context/theme-context";
import { Header, HeaderTitle } from "@/components/layout/header";

export default function DisplayPage() {
	const id = useId();
	const { theme, setTheme, accent, setAccent } = useTheme();

	const backgroundList = [
		{ name: "Default", value: "light" },
		{ name: "Dim", value: "dim" },
		{ name: "Lights out", value: "dark" }
	] as const;

	return (
		<Fragment>
			<Header>
				<HeaderTitle>Display</HeaderTitle>
			</Header>
			<p className="text-muted-foreground px-4 py-3 text-sm">
				Manage your color, and background. These settings affect all the X accounts on this browser.
			</p>
			<section className="w-full space-y-3 border-b px-4 pt-3 pb-6">
				<h3 className="text-xl font-extrabold">Color</h3>
				<div className="flex items-center justify-evenly">
					{accentColors.map((value) => (
						<label
							key={value}
							htmlFor={id + value}
							className="flex-center size-10 cursor-pointer rounded-full"
							style={{ backgroundColor: `var(--color-${value})` }}
						>
							<input
								type="radio"
								name="color"
								id={id + value}
								value={value}
								className="peer hidden"
								checked={accent === value}
								onChange={() => setAccent(value)}
							/>
							<Check className="hidden size-5 text-white peer-checked:block" />
						</label>
					))}
				</div>
			</section>
			<section className="w-full space-y-3 border-b px-4 pt-3 pb-6">
				<h3 className="text-xl font-extrabold">Background</h3>
				<div className="grid grid-cols-3 gap-x-3">
					{backgroundList.map(({ name, value }) => (
						<label
							key={value}
							htmlFor={id + value}
							className={cn(
								"bg-background text-foreground flex h-16 cursor-pointer items-center justify-center gap-x-3 rounded-sm p-3",
								"has-checked:ring-accent has-checked:ring-3",
								value
							)}
						>
							<input
								type="radio"
								name="background"
								id={id + value}
								checked={theme === value}
								onChange={() => setTheme(value)}
								className="peer hidden"
							/>
							<div className="flex-center peer-checked:bg-accent peer-checked:border-accent size-5 rounded-full border-2 peer-checked:*:block">
								<Check className="hidden size-3 text-white" />
							</div>
							<span className="font-bold">{name}</span>
						</label>
					))}
				</div>
			</section>
		</Fragment>
	);
}
