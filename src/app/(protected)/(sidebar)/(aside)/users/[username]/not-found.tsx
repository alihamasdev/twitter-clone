"use client";
import { useParams } from "next/navigation";

import { ProfileError } from "@/components/modules/profile/profile-states";

export default function ProfileNotFound() {
	const param = useParams();

	return <ProfileError username={`${param.username}`} />;
}
