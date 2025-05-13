"use client";
import { z } from "zod";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { type Profile } from "@/types/user";
import { profileFormSchema } from "@/lib/schemas";
import { updateProfile } from "@/actions/user/update-profile";
import { useAuth } from "@/context/auth-context";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarImage } from "@/components/modules/user";
import {
	FileUpload,
	FileUploadItem,
	FileUploadItemPreview,
	FileUploadTrigger,
	FileUploadClear
} from "@/components/ui/file-upload";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogCancel
} from "@/components/ui/alert-dialog";

const MAX_SIZE = 1 * 1024 * 1024; // 1MB

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
			avatar: [],
			header_image: [],
			name: profile?.name,
			bio: profile?.bio,
			location: profile?.location,
			website: profile?.website
		}
	});

	function onSubmit(values: z.infer<typeof profileFormSchema>) {
		startTransition(async () => {
			const { error, data } = await updateProfile(values);
			if (error || !data) {
				toast.error(error);
				return;
			}
			queryClient.invalidateQueries({ queryKey: [`profile`, username] });
			updateUser({ name: data.name, avatar: data.avatar });
			setOpen(false);
		});
	}

	const onFileValidate = (file: File): string | null => {
		if (!file.type.startsWith("image/")) return "Only image files are allowed";
		if (file.size > MAX_SIZE) return `File size must be less than ${MAX_SIZE / (1024 * 1024)} MB`;
		return null;
	};

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
							<div className="flex items-center gap-x-6">
								<AlertDialogCancel
									type="button"
									variant="ghost"
									icon="cross"
									size="icon"
									aria-label="Close"
									disabled={isPending}
								/>
								<AlertDialogTitle className="@lg/dialog:text-xl">Edit Profile</AlertDialogTitle>
								<AlertDialogDescription hidden />
							</div>
							<Button type="submit" size="sm" disabled={isPending || !form.formState.isValid}>
								Save
							</Button>
						</AlertDialogHeader>
						<section className="relative">
							{isPending && (
								<Spinner className="fixed top-1/2 left-1/2 z-50 m-0 size-7 -translate-x-1/2 -translate-y-1/2" />
							)}
							<div>
								<div className="relative w-full">
									<FormField
										control={form.control}
										name="header_image"
										render={({ field: { name, onChange, value } }) => (
											<FormItem>
												<FormControl>
													<div className="bg-image aspect-header relative w-full overflow-hidden">
														<FileUpload
															name={name}
															maxSize={MAX_SIZE}
															value={value}
															onValueChange={onChange}
															onFileReject={(_, message) => toast.error(message)}
															onFileValidate={onFileValidate}
															accept="image/*"
															className="z-1 w-full"
															disabled={isPending}
														>
															<div className="absolute-center flex gap-x-4">
																<FileUploadTrigger asChild>
																	<Button
																		size="icon"
																		icon="upload"
																		aria-label="Add photo"
																		className="bg-background hover:bg-background/80"
																	/>
																</FileUploadTrigger>
																<FileUploadClear asChild>
																	<Button
																		size="icon"
																		icon="cross"
																		aria-label="Remove photo"
																		className="bg-background hover:bg-background/80"
																	/>
																</FileUploadClear>
															</div>
															<FileUploadItem value={value[value.length - 1]} className="size-full">
																<FileUploadItemPreview className="aspect-header *:aspect-header w-full" />
															</FileUploadItem>
														</FileUpload>
														{profile.header_image && (
															<Image
																src={profile.header_image}
																width={600}
																height={200}
																alt={`${profile.name} header`}
																className="aspect-header w-full object-cover object-center"
															/>
														)}
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className="absolute -bottom-12 left-4 lg:-bottom-15">
										<FormField
											control={form.control}
											name="avatar"
											render={({ field: { name, onChange, value } }) => (
												<FormItem>
													<FormControl>
														<Avatar className="[&_svg]:absolute-center relative size-25 justify-between border-6 opacity-100 lg:size-33">
															<FileUpload
																name={name}
																maxSize={MAX_SIZE}
																value={value}
																onValueChange={onChange}
																onFileReject={(_, message) => toast.error(message)}
																onFileValidate={onFileValidate}
																accept="image/*"
																className="z-1 size-full"
																disabled={isPending}
															>
																<div className="absolute-center flex gap-x-2">
																	<FileUploadTrigger asChild>
																		<Button
																			size="icon"
																			icon="upload"
																			aria-label="Add photo"
																			className="bg-background hover:bg-background/80"
																		/>
																	</FileUploadTrigger>
																	<FileUploadClear asChild>
																		<Button
																			size="icon"
																			icon="cross"
																			aria-label="Remove photo"
																			className="bg-background hover:bg-background/80"
																		/>
																	</FileUploadClear>
																</div>

																<FileUploadItem value={value[value.length - 1]} className="size-full">
																	<FileUploadItemPreview className="aspect-square size-full *:aspect-square" />
																</FileUploadItem>
															</FileUpload>
															<AvatarImage src={profile.avatar} className="z-0 hover:opacity-100" />
														</Avatar>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
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
							</div>
						</section>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
