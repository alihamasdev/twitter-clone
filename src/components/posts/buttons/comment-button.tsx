import { Icon } from "@/components/ui/icon";

export function CommentButton() {
	return (
		<button
			className="size-8 flex-center rounded-full hover:bg-blue/10 group cursor-pointer disabled:opacity-50"
			disabled
		>
			<Icon id="comment" className="size-4.5 fill-muted-foreground group-hover:fill-blue" />
		</button>
	);
}
