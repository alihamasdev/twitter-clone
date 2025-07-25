import { getUserByUsername } from "@/lib/dal";

import { BannerDialog } from "./banner-dialog";

export default async function AvatarImagePage({ params }: { params: Promise<{ username: string }> }) {
	const { username } = await params;
	const { userId } = await getUserByUsername(username);

	return <BannerDialog userId={userId} username={username} />;
}
