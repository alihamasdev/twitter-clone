import { type Profile } from "@prisma/client";

export type User = Pick<Profile, "id" | "name" | "username" | "avatar" | "verified">;
export type Profile = Profile;
export type ProfileData = Profile & {
	tweets_count: number;
	followers_count: number;
	following_count: number;
	isFollowing: boolean;
	isCurrentUser: boolean;
};
