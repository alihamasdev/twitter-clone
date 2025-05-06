"use server";

import { type Profile } from "@/types/user";
import { createClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/actions/auth/get-auth-user";

import { EditProfileForm } from "./form/edit-profile-form";
import { FollowButton } from "@/components/modules/user";

export async function ProfileButton({ profile }: { profile: Profile }) {
	const loggedinUser = await getAuthUser();

	if (profile.id === loggedinUser.id) {
		return <EditProfileForm profile={profile} />;
	}

	return <ProfileFollow profileId={profile.id} userId={loggedinUser.id} />;
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
		return <FollowButton userId={profileId} isFollowing={false} />;
	}

	return <FollowButton userId={profileId} isFollowing />;
}
