import { type IconId } from "@/types/icons";
import { cn } from "@/lib/utils";

interface IconProps extends React.SVGAttributes<HTMLOrSVGElement> {
	id: IconId;
}

function Icon({ id, className, ...props }: IconProps) {
	return (
		<svg data-slot="icon" id={id} className={cn("fill-foreground size-5", className)} {...props}>
			<use href={`/icons.svg#${id}`} />
		</svg>
	);
}

export { Icon, type IconProps, type IconId };
