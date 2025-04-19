import { Search } from "./search";
import { AsideLinks } from "./aside-links";
import { buttonVariants } from "@/components/ui/button";

export function Aside() {
	const date = new Date();
	const year = date.getFullYear();
	return (
		<aside className="sticky top-0 hidden h-dvh w-full max-w-88 min-w-75 space-y-4 overflow-y-auto px-1 py-4 lg:block">
			<Search />
			<section className="bg-card text-card-foreground rounded-2xl border px-4 py-3">
				<h1 className="text-xl font-extrabold">Fork it on GitHub</h1>
				<p className="mt-2 mb-3 text-base">Explore the codebase behind Twitter and contribute to its development.</p>
				<a
					href="https://github.com/alihamasdev/twitter"
					target="_blank"
					rel="noopener noreferrer"
					className={buttonVariants({ variant: "accent" })}
				>
					Repository
				</a>
			</section>
			<AsideLinks />
			<p className="text-muted-foreground text-center text-sm">&#169; {year} Twitter, Inc.</p>
		</aside>
	);
}
