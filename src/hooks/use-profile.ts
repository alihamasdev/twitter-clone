"use client";

import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { type ProfilePageUser } from "@/types/user";

export function useProfile(userId: string) {
	return useQuery({
		queryKey: [`profile`, userId],
		queryFn: () => axios.get<ProfilePageUser>(`/api/${userId}`).then((res) => res.data),
		staleTime: 15 * 60 * 1000 // 15 minutes
	});
}
