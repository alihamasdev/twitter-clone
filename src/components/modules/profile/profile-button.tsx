"use server";

import { type Profile } from "@/types/user";
import { createClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/actions/auth/get-auth-user";

import { EditProfileForm } from "./form/edit-profile-form";
import { FollowButton } from "@/components/modules/user";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export async function ProfileButton({ profileId }: { profileId: Profile["id"] }) {
	const loggedinUser = await getAuthUser();

	if (profileId === loggedinUser.id) {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">Edit Profile</Button>
				</DialogTrigger>
				<EditProfileForm />
			</Dialog>
		);
	}

	return <ProfileFollow profileId={profileId} userId={loggedinUser.id} />;
}

async function ProfileFollow({ profileId, userId }: { profileId: Profile["id"]; userId: Profile["id"] }) {
	const supabase = await createClient();
	const { error } = await supabase
		.from("followers")
		.select("id", { count: "exact", head: true })
		.eq("user_id", userId)
		.eq("user_to_follow", profileId)
		.single();

	if (error) {
		return <FollowButton userId={userId} isFollowing={false} />;
	}

	return <FollowButton userId={userId} isFollowing />;
}
