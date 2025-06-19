import { Icon } from "@/components/ui/icon";

export function CommentButton() {
	return (
		<button
			className="flex-center hover:bg-blue/10 group size-8 cursor-pointer rounded-full disabled:opacity-50"
			disabled
		>
			<Icon id="comment" className="fill-muted-foreground group-hover:fill-blue size-4.5" />
		</button>
	);
}
