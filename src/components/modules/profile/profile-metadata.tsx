import { format } from "date-fns";

import { type Profile } from "@/types/user";

import { Icon, type IconId } from "@/components/ui/icon";

type ProfileMetadataProps = Pick<Profile, "location" | "website" | "created_at">;
type Metadata = {
	icon: IconId;
	data: string | null;
	link?: boolean;
};

export function ProfileMetadata({ location, website, created_at }: ProfileMetadataProps) {
	const date = format(created_at, `LLLL yyyy`);
	const metadata: Metadata[] = [
		{
			icon: "location",
			data: location
		},
		{
			icon: "copy",
			data: website,
			link: true
		},
		{
			icon: "calender",
			data: `Joined ${date}`
		}
	];

	return metadata.map(
		({ icon, data, link }) =>
			data && (
				<div key={icon} className="flex items-center gap-x-1.5 text-base">
					<Icon id={icon} className="fill-muted-foreground size-4" />
					{!link ? (
						<span className="text-muted-foreground">{data}</span>
					) : (
						<a href={data} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
							{data.replace(/^https?:\/\//, "")}
						</a>
					)}
				</div>
			)
	);
}
