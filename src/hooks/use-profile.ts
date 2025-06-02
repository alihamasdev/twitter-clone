"use client";

import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { type ProfilePageUser } from "@/types/user";

export function useProfile(username: string) {
	return useQuery({
		queryKey: [`profile`, username],
		queryFn: () => axios.get<ProfilePageUser>(`/api/users/username/${username}`).then((res) => res.data),
		staleTime: 15 * 60 * 1000 // 15 minutes
	});
}
