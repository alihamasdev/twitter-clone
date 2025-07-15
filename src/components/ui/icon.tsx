import { cn } from "@/lib/utils";

interface IconProps extends React.SVGAttributes<HTMLOrSVGElement> {
	id: IconId;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const icons = [
	"twitter",
	"cross",
	"retry",
	"back",
	"ellipsis",
	"ellipsis-circle",
	"verified",
	"home",
	"home-solid",
	"search",
	"search-solid",
	"notifications",
	"notifications-solid",
	"messages",
	"messages-solid",
	"communities",
	"communities-solid",
	"communities-solid",
	"profile",
	"profile-solid",
	"bookmarks",
	"bookmarks-solid",
	"retweet",
	"retweet-solid",
	"like",
	"like-solid",
	"comment",
	"analytics",
	"share",
	"post",
	"display",
	"settings",
	"arrow-top-right",
	"image",
	"gif",
	"poll",
	"emoji",
	"schedule",
	"location",
	"copy",
	"delete",
	"edit",
	"pin",
	"highlight",
	"calender",
	"follow",
	"unfollow",
	"mute",
	"block",
	"upload"
] as const;
type IconId = (typeof icons)[number];

function Icon({ id, className, ...props }: IconProps) {
	return (
		<svg data-slot="icon" id={id} className={cn("fill-foreground size-5", className)} {...props}>
			<use href={`/icons.svg#${id}`} />
		</svg>
	);
}

export { Icon, type IconProps, type IconId };
