import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { LinkToProfile } from "./link-to-profile";

import { type User } from "@/types/user";

interface NameProps extends React.ComponentProps<"div"> {
	name: User["name"];
	verified: User["verified"];
	link?: User["username"] | false;
}

function Name({ name, verified, link = false, className, ...props }: NameProps) {
	return (
		<LinkToProfile link={link} className={cn("flex items-center gap-x-0.5", className)} {...props}>
			<p className={cn("text-foreground text-base font-bold underline-offset-4", link && "hover:underline")}>{name}</p>
			{verified && <Icon id="verified" className="fill-blue size-4.5" />}
		</LinkToProfile>
	);
}

export { Name };
