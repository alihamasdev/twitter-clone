import { type Profile } from "@prisma/client";

export type User = Pick<Profile, "id" | "name" | "username" | "avatar" | "verified">;
export type Profile = Profile;
