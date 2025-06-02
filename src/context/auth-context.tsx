"use client";

import { createContext, use } from "react";
import { useQuery } from "@tanstack/react-query";

import { getLoginUserData } from "@/lib/dal";
import { type UserData } from "@/types/user";

interface AuthContextType {
	user: UserData | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
	children,
	userPromise
}: React.PropsWithChildren<{ userPromise: Promise<UserData | null> }>) {
	const initialUser = use(userPromise);

	const { data: user } = useQuery({
		queryKey: [`auth`],
		staleTime: Infinity,
		initialData: initialUser,
		queryFn: () => getLoginUserData()
	});

	return <AuthContext value={{ user }}>{children}</AuthContext>;
}

/**
 * @returns	currently logged in `user` data
 * @throws `Error` if user is null
 */

export function useAuth(): { user: UserData } {
	const authContext = use(AuthContext);

	if (!authContext) {
		throw new Error("useAuth should be used within <AuthProvider>");
	}

	const { user } = authContext;
	if (!user) throw new Error("User not found in database");

	return { user };
}
