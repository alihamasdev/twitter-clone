"use client";

import { Fragment, useId } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { accentColors, useTheme } from "@/context/theme-context";
import { Header, HeaderTitle } from "@/components/layout/header";
import { Avatar, Name, Username } from "@/components/user";

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
			<article className="px-4 pb-6 pt-3 w-full flex items-start gap-x-3 border-b">
				<Avatar src="/twitter.png" url={null} />
				<div className="w-full space-y-1">
					<div className="flex items-center gap-x-1 text-muted-foreground">
						<Name url={null}>Twitter</Name>
						<Username url={null}>twitter</Username>
						<p>·</p>
						<p>26m</p>
					</div>
					<p className="whitespace-pre-line break-words">
						At the heart of Twitter are short messages called Tweets — just like this one — which can include photos,
						videos, links, text, hashtags, and mentions like{" "}
						<span className="text-accent cursor-pointer">@twitter</span>
					</p>
				</div>
			</article>
			<section className="space-y-3 w-full px-4 pt-3 pb-6 border-b">
				<h3 className="text-xl font-extrabold">Color</h3>
				<div className="flex justify-evenly items-center">
					{accentColors.map((value) => (
						<label
							key={value}
							htmlFor={id + value}
							className="size-10 rounded-full cursor-pointer flex-center"
							style={{ backgroundColor: `var(--color-${value})` }}
						>
							<input
								type="radio"
								name="color"
								id={id + value}
								value={value}
								className="hidden peer"
								checked={accent === value}
								onChange={() => setAccent(value)}
							/>
							<Check className="text-white size-5 hidden peer-checked:block" />
						</label>
					))}
				</div>
			</section>
			<section className="space-y-3 w-full px-4 pt-3 pb-6 border-b">
				<h3 className="text-xl font-extrabold">Background</h3>
				<div className="grid grid-cols-3 gap-x-3">
					{backgroundList.map(({ name, value }) => (
						<label
							key={value}
							htmlFor={id + value}
							className={cn(
								"flex items-center justify-center gap-x-3 p-3 bg-background text-foreground rounded-sm h-16 cursor-pointer",
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
								className="hidden peer"
							/>
							<div className="flex-center rounded-full size-5 border-2 peer-checked:bg-accent peer-checked:border-accent peer-checked:*:block">
								<Check className="text-white size-3 hidden" />
							</div>
							<span className="font-bold">{name}</span>
						</label>
					))}
				</div>
			</section>
		</Fragment>
	);
}
