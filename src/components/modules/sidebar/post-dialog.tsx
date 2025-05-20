"use client";

import { useState } from "react";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { TweetForm } from "@/components/modules/tweet/form/tweet-form";

export default function PostDialog() {
	const [open, setOpen] = useState(false);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button size={null} className="my-5 min-h-13 min-w-13 text-lg xl:w-full xl:px-6">
					<Icon id="post" className="fill-primary-foreground size-6 xl:hidden" />
					<span className="hidden xl:block">Post</span>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="top-[5%] translate-y-0">
				<div className="relative p-2">
					<AlertDialogHeader className="mb-8 flex-row justify-between">
						<AlertDialogTitle className="sr-only">Post new tweet</AlertDialogTitle>
						<AlertDialogDescription className="sr-only">Create new tweet and post it</AlertDialogDescription>
						<AlertDialogCancel variant="ghost" size="icon" icon="cross" aria-label="Close" />
						<Button variant="ghost" className="hover:bg-accent/10 text-accent" disabled>
							Drafts
						</Button>
					</AlertDialogHeader>
					<TweetForm dialog={setOpen} />
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
