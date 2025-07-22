import { TriangleAlert } from "lucide-react";

export default function NotFound() {
	return (
		<div className="flex-center text-muted-foreground mt-25 flex-col gap-y-3">
			<TriangleAlert className="size-12" />
			<p>Post not found</p>
		</div>
	);
}
