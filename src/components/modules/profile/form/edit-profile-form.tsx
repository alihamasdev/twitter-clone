"use client";

import { useState, useTransition } from "react";
import { useAuth } from "@/context/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

import { type Profile } from "@/types/user";
import { updateProfile } from "@/actions/user/update-profile";
import { profileFormSchema } from "@/lib/schemas";

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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { UploadAvatar } from "./upload-avatar";
import { UploadHeader } from "./upload-header";

export function EditProfileForm() {
	const { user, updateUser } = useAuth();
	const username = user.username;
	const queryClient = useQueryClient();
	const profile = queryClient.getQueryData<Profile>(["profile", username]);
	const [open, setOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof profileFormSchema>>({
		resolver: zodResolver(profileFormSchema),
		mode: "onChange",
		defaultValues: {
			avatar: undefined,
			header_image: undefined,
			name: profile?.name,
			bio: profile?.bio,
			location: profile?.location,
			website: profile?.website
		}
	});

	function onSubmit(values: z.infer<typeof profileFormSchema>) {
		console.log(values);
		startTransition(async () => {
			const { error, data } = await updateProfile(values);
			if (error || !data) {
				toast.error(error);
				return;
			}
			queryClient.refetchQueries({ queryKey: [`profile`, username] });
			updateUser({ name: data.name, avatar: data.avatar });
			setOpen(false);
		});
	}

	if (!profile) {
		return;
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="outline">Edit Profile</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="max-h-full pb-8">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="size-full">
						<AlertDialogHeader className="bg-background/80 sticky top-0 z-10 mb-0 flex-row justify-between border-b px-4 py-3 backdrop-blur-md">
							<div className="flex items-center gap-x-3">
								<AlertDialogCancel variant="ghost" icon="cross" size="icon" aria-label="Close" disabled={isPending} />
								<AlertDialogTitle className="@lg/dialog:text-xl">Edit Profile</AlertDialogTitle>
								<AlertDialogDescription hidden />
							</div>
							<Button size="sm" type="submit" disabled={isPending || !form.formState.isValid}>
								Save
							</Button>
						</AlertDialogHeader>
						<section className="relative">
							{isPending && (
								<Spinner className="fixed top-1/2 left-1/2 z-50 m-0 size-7 -translate-x-1/2 -translate-y-1/2" />
							)}

							<div className="relative w-full">
								<FormField
									name="header_image"
									control={form.control}
									render={({ field: { onChange } }) => (
										<FormControl>
											<UploadHeader prevHeader={profile.header_image} onChange={onChange} />
										</FormControl>
									)}
								/>
								<FormField
									name="avatar"
									control={form.control}
									render={({ field: { onChange } }) => (
										<FormControl>
											<UploadAvatar onChange={onChange} />
										</FormControl>
									)}
								/>
							</div>

							<div className="mt-18 space-y-6 px-4 py-3">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<div className="grid gap-y-2">
											<FormItem>
												<FormControl>
													<Input disabled={isPending} {...field} />
												</FormControl>
												<FormLabel className="capitalize">{field.name}</FormLabel>
											</FormItem>
											<FormMessage />
										</div>
									)}
								/>
								<FormField
									control={form.control}
									name="bio"
									render={({ field: { value, ...field } }) => (
										<div className="grid gap-y-2">
											<FormItem>
												<FormControl>
													<Input disabled={isPending} value={value || ""} {...field} />
												</FormControl>
												<FormLabel className="capitalize">{field.name}</FormLabel>
											</FormItem>
											<FormMessage />
										</div>
									)}
								/>
								<FormField
									control={form.control}
									name="location"
									render={({ field: { value, ...field } }) => (
										<div className="grid gap-y-2">
											<FormItem>
												<FormControl>
													<Input disabled={isPending} value={value || ""} {...field} />
												</FormControl>
												<FormLabel className="capitalize">{field.name}</FormLabel>
											</FormItem>
											<FormMessage />
										</div>
									)}
								/>
								<FormField
									control={form.control}
									name="website"
									render={({ field: { value, ...field } }) => (
										<div className="grid gap-y-2">
											<FormItem>
												<FormControl>
													<Input disabled={isPending} value={value || ""} {...field} />
												</FormControl>
												<FormLabel className="capitalize">{field.name}</FormLabel>
											</FormItem>
											<FormMessage />
										</div>
									)}
								/>
							</div>
						</section>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
