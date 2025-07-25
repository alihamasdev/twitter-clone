"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { profileSchema, type ProfileSchema } from "@/lib/validation";
import { useProfile } from "@/hooks/use-profile";
import { useAuth } from "@/context/auth-context";
import type { ProfilePageUser, UserData } from "@/types/user";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Error } from "@/components/ui/error";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

import { updateProfile } from "./action";
import { UploadAvatar } from "./upload-avatar";
import { UploadBanner } from "./upload-banner";

export default function EditProfilePage() {
	const { user } = useAuth();
	const router = useRouter();
	const queryClient = useQueryClient();
	const [isLoading, startTransition] = useTransition();
	const { data, error, isPending } = useProfile(user.id);

	const form = useForm({
		mode: "onChange",
		resolver: zodResolver(profileSchema),
		defaultValues: {
			avatar: undefined,
			banner: undefined,
			name: data?.name,
			bio: data?.bio,
			location: data?.location,
			website: data?.website
		}
	});

	function onSubmit(values: ProfileSchema) {
		startTransition(async () => {
			const { data, error } = await updateProfile(values);

			if (error || !data) {
				toast.error(error);
				return;
			}

			queryClient.setQueryData<ProfilePageUser>([`profile`, user.id], (oldData) =>
				oldData ? { ...oldData, ...data } : undefined
			);
			queryClient.setQueryData([`auth`], (oldData: UserData) => ({
				...oldData,
				name: data.name,
				avatarUrl: data.avatarUrl
			}));

			router.back();
		});
	}

	if (isPending) {
		return (
			<div className="flex-center size-full">
				<Spinner className="mt-0" />
			</div>
		);
	}

	if (error) {
		console.error(error);
		return (
			<div className="flex-center size-full">
				<Error className="mt-0" />
			</div>
		);
	}

	return (
		<DialogContent className="h-full max-h-[85dvh]">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} hidden={isLoading}>
					<DialogHeader className="bg-background/80 sticky top-0 z-10 mb-0 flex-row justify-between border-b px-4 py-3 backdrop-blur-md">
						<div className="flex items-center gap-x-3">
							<DialogClose variant="ghost" size="icon" icon="cross" />
							<DialogTitle>Edit Profile</DialogTitle>
							<DialogDescription />
						</div>
						<Button type="submit" size="sm" className="min-w-16" disabled={isLoading || !form.formState.isValid}>
							{isLoading ? "Save" : <Spinner className="border-muted-foreground/50 mt-0 size-4 border-3" />}
						</Button>
					</DialogHeader>
					<div className="relative w-full">
						<FormField
							name="banner"
							disabled={isLoading}
							control={form.control}
							render={() => (
								<FormControl>
									<UploadBanner previousValue={data.bannerUrl} disabled={isLoading} />
								</FormControl>
							)}
						/>
						<FormField
							name="avatar"
							disabled={isLoading}
							control={form.control}
							render={() => (
								<FormControl>
									<UploadAvatar previousValue={data.avatarUrl} disabled={isLoading} />
								</FormControl>
							)}
						/>
					</div>
					<div className="mt-18 space-y-6 px-4 pt-3 pb-6">
						<FormField
							name="name"
							disabled={isLoading}
							control={form.control}
							render={({ field }) => (
								<div className="grid gap-y-2">
									<FormItem>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormLabel className="capitalize">{field.name}</FormLabel>
									</FormItem>
									<FormMessage />
								</div>
							)}
						/>
						<FormField
							name="bio"
							disabled={isLoading}
							control={form.control}
							render={({ field: { value, ...field } }) => (
								<div className="grid gap-y-2">
									<FormItem>
										<FormControl>
											<Textarea className="pt-8" value={value || ""} {...field} />
										</FormControl>
										<FormLabel className="top-8 capitalize">{field.name}</FormLabel>
									</FormItem>
									<FormMessage />
								</div>
							)}
						/>
						<FormField
							name="location"
							disabled={isLoading}
							control={form.control}
							render={({ field: { value, ...field } }) => (
								<div className="grid gap-y-2">
									<FormItem>
										<FormControl>
											<Input value={value || ""} {...field} />
										</FormControl>
										<FormLabel className="capitalize">{field.name}</FormLabel>
									</FormItem>
									<FormMessage />
								</div>
							)}
						/>
						<FormField
							name="website"
							disabled={isLoading}
							control={form.control}
							render={({ field: { value, ...field } }) => (
								<div className="grid gap-y-2">
									<FormItem>
										<FormControl>
											<Input value={value || ""} {...field} />
										</FormControl>
										<FormLabel className="capitalize">{field.name}</FormLabel>
									</FormItem>
									<FormMessage />
								</div>
							)}
						/>
					</div>
				</form>
			</Form>
		</DialogContent>
	);
}
