"use server";

import { type Profile } from "@/types/user";
import { getUser } from "@/actions/auth/get-user";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
	DialogClose
} from "@/components/ui/dialog";
import { FollowButton } from "@/components/modules/user";

export async function EditProfile({ data }: { data: Profile }) {
	const loggedinUser = await getUser();

	if (data.id !== loggedinUser.id) {
		return <FollowButton size="default" />;
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Edit Profile</Button>
			</DialogTrigger>
			<DialogContent className="h-full">
				<DialogHeader className="mb-0 flex-row justify-between border-b px-4 py-3">
					<DialogClose variant="ghost" icon="cross" size="icon" aria-label="Close" />
					<DialogTitle className="@lg/dialog:text-2xl">Edit Profile</DialogTitle>
					<DialogDescription hidden />
					<Button size="sm">Save</Button>
				</DialogHeader>
				<DialogFooter className="h-full"></DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
