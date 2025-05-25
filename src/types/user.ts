import { type Prisma } from "@prisma/client";

export const userDataSelect = {
	id: true,
	name: true,
	username: true,
	avatarUrl: true
} satisfies Prisma.UserSelect;

export type UserData = Prisma.UserGetPayload<{ select: typeof userDataSelect }>;
