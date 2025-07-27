"use client";

import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { postSchema, type PostSchema } from "@/lib/validation";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { useSubmitPostMutation } from "./mutation";

interface PostFormProps {
	children?: React.ReactNode;
	placeholder?: string;
	parentId?: string | null;
	handleClose?: () => void;
}

export function PostForm({ handleClose, placeholder = "What's happening?", parentId = null, children }: PostFormProps) {
	const { user } = useAuth();
	const { mutate } = useSubmitPostMutation();
	const [isPending, startTransition] = useTransition();

	const form = useForm<PostSchema>({
		mode: "onSubmit",
		resolver: zodResolver(postSchema),
		defaultValues: { content: "", parentId }
	});

	const onSubmit = ({ content }: PostSchema) => {
		startTransition(async () => {
			mutate(
				{ content, parentId },
				{
					onSuccess: () => {
						form.reset({ content: "", parentId: null });
						handleClose?.();
					}
				}
			);
		});
	};

	return (
		<div className="w-full">
			<AnimatePresence>
				{isPending && (
					<motion.div
						initial={{ width: 0, height: 4 }}
						animate={{ width: "100%", transition: { duration: 1, ease: "easeIn" } }}
						exit={{ width: "100%", transition: { duration: 0.2, ease: "linear" } }}
						className="bg-accent absolute top-0 left-0"
					/>
				)}
			</AnimatePresence>
			{children}
			<div className={cn("relative w-full", { "pointer-events-none opacity-50": isPending })} aria-disabled={isPending}>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-start gap-x-3">
						<Avatar>
							<AvatarImage src={user.avatarUrl} />
						</Avatar>
						<div className="flex w-full flex-col overflow-x-hidden">
							<FormField
								name="content"
								control={form.control}
								render={({ field: { disabled, ...field } }) => (
									<FormControl>
										<Textarea
											disabled={isPending || disabled}
											placeholder={placeholder}
											className="mt-1 max-h-100 w-full border-none p-0 pb-3 text-xl font-medium focus:ring-0"
											{...field}
										/>
									</FormControl>
								)}
							/>
							<div className="flex items-center justify-end">
								<Button
									type="submit"
									className="transition-all duration-200"
									disabled={isPending || !form.formState.isValid}
								>
									Post
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
