const links: Array<{ name: string; link: string }> = [
	{
		name: "Developer Portfolio",
		link: "https://alihamas.vercel.app"
	},
	{
		name: "Chat App",
		link: "https://chaty-alihamas.vercel.app"
	},
	{
		name: "Chrome New Tab",
		link: "https://itab-alihamas.vercel.app"
	}
];

export function AsideLinks() {
	return (
		<section className="text-muted-foreground flex-center flex-wrap gap-x-4 gap-y-3 text-sm *:underline-offset-3 *:hover:underline">
			{links.map(({ name, link }) => (
				<a
					href={link}
					key={name}
					className="focus-visible:text-accent outline-none focus-visible:underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					{name}
				</a>
			))}
		</section>
	);
}
