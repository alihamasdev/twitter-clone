"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

import { createTweet } from "@/actions/tweet/create-tweet";
import { tweetFormSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
	FileUpload,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadItemPreview,
	FileUploadList,
	FileUploadTrigger
} from "@/components/ui/file-upload";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Icon } from "@/components/ui/icon";
import { ImageDialog, ImageDialogContent, ImageDialogTrigger } from "@/components/ui/image-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage } from "@/components/modules/user";

import { tweetButtons } from "./tweet-buttons";

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

interface TweetFormProps extends React.ComponentProps<"div"> {
	dialog?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TweetForm({ dialog, className, ...props }: TweetFormProps) {
	const { user } = useAuth();
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof tweetFormSchema>>({
		resolver: zodResolver(tweetFormSchema),
		mode: "onSubmit"
	});

	const onFileValidate = (file: File): string | null => {
		if (!file.type.startsWith("image/")) return "Only image files are allowed";
		if (file.size > MAX_SIZE) return `File size must be less than ${MAX_SIZE / (1024 * 1024)} MB`;
		return null;
	};

	const onSubmit = (values: z.infer<typeof tweetFormSchema>) => {
		startTransition(async () => {
			const { error, newTweet } = await createTweet(values);
			if (error) {
				toast.error(error);
				return;
			}

			form.reset({ tweet_images: undefined, tweet_text: "" });
			toast.success(() => (
				<div className="flex items-center gap-x-3">
					<span>Your tweet has been sent</span>
					<Link href={`/tweets/${newTweet?.id}`} className="hover:underline font-bold">
						View
					</Link>
				</div>
			));
			dialog && dialog(false);
		});
	};

	return (
		<div className={cn("flex w-full items-start gap-x-3", className)} {...props}>
			{isPending && <div className="bg-accent absolute top-0 left-0 h-1 w-full animate-pulse" />}
			<div className={cn("relative w-full", isPending && "opacity-50")}>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-start gap-x-3">
						<Avatar link={user.username}>
							<AvatarImage src={user.avatar} />
						</Avatar>
						<div className="flex w-full flex-col">
							<FormField
								control={form.control}
								name="tweet_text"
								render={({ field }) => (
									<FormControl>
										<Textarea
											maxLength={300}
											disabled={isPending}
											placeholder="What's happening?"
											className="max-h-100 border-none p-0 pb-3 text-xl font-medium focus:ring-0 disabled:cursor-default"
											{...field}
										/>
									</FormControl>
								)}
							/>
							<FormField
								control={form.control}
								name="tweet_images"
								render={({ field: { name, onChange, value } }) => (
									<FormControl>
										<FileUpload
											name={name}
											value={value}
											onValueChange={onChange}
											maxFiles={4}
											accept="image/*"
											maxSize={MAX_SIZE}
											onFileValidate={onFileValidate}
											onFileReject={(_, message) => toast.error(message)}
											multiple
										>
											<FileUploadList className="grid max-h-75 grid-cols-2 grid-rows-2 gap-3 overflow-hidden pb-3">
												{value?.map((file, index) => (
													<FileUploadItem
														value={file}
														key={index}
														className={cn(
															"relative max-h-full overflow-hidden rounded-lg border",
															value.length === 1 && "col-span-2 row-span-2",
															value.length === 2 && "row-span-2",
															value.length === 3 && index === 0 && "row-span-2"
														)}
													>
														<ImageDialog>
															<ImageDialogTrigger asChild>
																<FileUploadItemPreview
																	className={cn(
																		"cursor-pointer transition-[opacity] duration-300 hover:opacity-80",
																		value.length > 1 && "size-full *:h-full"
																	)}
																/>
															</ImageDialogTrigger>
															<ImageDialogContent>
																<img src={URL.createObjectURL(file)} alt={file.name} className="rounded-2xl" />
															</ImageDialogContent>
														</ImageDialog>
														<FileUploadItemDelete asChild>
															<Button
																variant="ghost"
																size="icon"
																aria-label="Remove"
																className="absolute top-2 right-2 size-6 bg-black hover:bg-black/70"
															>
																<Icon id="cross" className="size-3.5" />
															</Button>
														</FileUploadItemDelete>
													</FileUploadItem>
												))}
											</FileUploadList>
											<div className="flex w-full items-center justify-between border-t pt-3" hidden={isPending}>
												<div className="flex items-center">
													<FileUploadTrigger asChild>
														<Button
															type="button"
															variant="ghost"
															size="icon"
															aria-label="Media"
															className="hover:bg-accent/20"
														>
															<Icon id="image" className="fill-accent size-5" />
														</Button>
													</FileUploadTrigger>
													{tweetButtons.map(({ icon, tooltip }) => (
														<Button
															type="button"
															key={tooltip}
															variant="ghost"
															size="icon"
															aria-label={tooltip}
															disabled
														>
															<Icon id={icon} className="fill-accent size-5" />
														</Button>
													))}
												</div>
												<Button type="submit" disabled={!form.formState.isValid || isPending}>
													Post
												</Button>
											</div>
										</FileUpload>
									</FormControl>
								)}
							/>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
