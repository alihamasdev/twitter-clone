import { getUserByUsername } from "@/lib/dal";

import { AvatarDialog } from "./avatar-dialog";

export default async function AvatarImagePage({ params }: { params: Promise<{ username: string }> }) {
	const { username } = await params;
	const { userId } = await getUserByUsername(username);

	return <AvatarDialog userId={userId} username={username} />;
}
