import { type Tables } from "./supabase";

export type User = Pick<Tables<"profiles">, "id" | "name" | "username" | "verified" | "avatar">;
export type Profile = Tables<"profiles">;
