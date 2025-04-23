import { type Tables } from "./supabase";

export type User = Pick<Tables<"profiles">, "id" | "name" | "username" | "verified" | "avatar">;
