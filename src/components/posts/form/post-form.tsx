"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { postSchema, type PostSchema } from "@/lib/validation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { type IconId } from "@/components/ui/icon";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/user";

import { useSubmitPostMutation } from "./mutation";
import { ProgressTracker } from "./progress-tracker";

const formButtons = ["image", "emoji", "gif", "poll", "schedule"] satisfies IconId[];

export function PostForm({ isDialog, className, ...props }: React.ComponentProps<"div"> & { isDialog?: boolean }) {
	const router = useRouter();
	const { mutate } = useSubmitPostMutation();
	const [isPending, startTransition] = useTransition();

	const {
		user: { avatarUrl, username }
	} = useAuth();

	const form = useForm<PostSchema>({
		mode: "onSubmit",
		resolver: zodResolver(postSchema),
		defaultValues: { content: "" }
	});

	const tweetLength = form.watch("content").length;

	const handleCloseDialog = () => {
		if (isDialog) {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			history.length > 1 ? router.back() : router.push("/home");
		}
	};

	const onSubmit = ({ content }: PostSchema) => {
		startTransition(async () => {
			mutate(
				{ content },
				{
					onSuccess: () => {
						form.reset({ content: "" });
						handleCloseDialog();
					}
				}
			);
		});
	};

	return (
		<div className={cn("flex w-full items-start gap-x-3", className)} {...props}>
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
			<div className={cn("relative w-full", { "pointer-events-none opacity-50": isPending })} aria-disabled={isPending}>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-start gap-x-3">
						<Avatar src={avatarUrl} href={username} />
						<div className="flex w-full flex-col overflow-x-hidden">
							<FormField
								name="content"
								control={form.control}
								render={({ field }) => (
									<FormControl>
										<Textarea
											disabled={isPending}
											placeholder="What's happening?"
											className="max-h-100 w-full border-none p-0 pb-3 text-xl font-medium focus:ring-0"
											{...field}
										/>
									</FormControl>
								)}
							/>
							<div className="flex w-full items-center justify-between border-t pt-3">
								<div className="flex">
									{formButtons.map((id) => (
										<Button key={id} variant="accent-ghost" size="icon" icon={id} disabled />
									))}
								</div>
								<div className="flex items-center gap-x-3">
									<AnimatePresence>{tweetLength && <ProgressTracker inputLength={tweetLength} />}</AnimatePresence>
									<Button
										type="submit"
										className="transition-all duration-200"
										disabled={isPending || !form.formState.isValid}
									>
										Post
									</Button>
								</div>
							</div>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
