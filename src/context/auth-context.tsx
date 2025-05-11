"use client";
import { createContext, use, useState, useMemo, type ReactNode } from "react";

import { type User } from "@/types/user";

interface UpdateUser {
	name?: User["name"];
	avatar?: User["avatar"];
}

interface AuthContextType {
	user: User;
	updateUser: (data: UpdateUser) => void;
	updateUsername: (username: User["username"]) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ user: initialUser, ...props }: { children: ReactNode; user: User }) {
	const [user, setUser] = useState<User>(initialUser);

	const updateUser = (data: UpdateUser) => {
		setUser((prevUser) => {
			const { name, avatar, ...staticUser } = prevUser;
			return { ...staticUser, name: data.name || name, avatar: data.avatar || avatar };
		});
	};

	const updateUsername = (username: User["username"]) => {
		setUser((prevUser) => ({ ...prevUser, username }));
	};

	const contextValue = useMemo(() => ({ user, updateUser, updateUsername }), [user, updateUser, updateUsername]);

	return <AuthContext value={contextValue} {...props} />;
}

function useAuth() {
	const authContext = use(AuthContext);
	if (!authContext) throw new Error("useAuth should be used within <AuthProvider>");
	return authContext;
}

export { AuthProvider, useAuth };
