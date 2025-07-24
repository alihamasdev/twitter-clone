"use client";

import { Fragment, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { usernameSchema } from "@/lib/validation";
import { useAuth } from "@/context/auth-context";
import { UserData } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { updateUsername } from "./action";

export default function UsernamePage() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [isPending, startTransition] = useTransition();

	const form = useForm({
		mode: "onChange",
		resolver: zodResolver(usernameSchema),
		defaultValues: { username: user.username }
	});

	const onSubmit = ({ username }: { username: string }) => {
		startTransition(async () => {
			const { data, error } = await updateUsername(username);

			if (error || !data) {
				form.setError("username", { message: error.message });
				return;
			}

			queryClient.setQueryData([`auth`], (oldData: UserData) => ({ ...oldData, username: data.username }));

			queryClient.removeQueries({ queryKey: [`profile`, data.username] });

			toast.success("Username changed successfully");
		});
	};

	return (
		<Fragment>
			<div className="px-4 py-3">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="username"
							render={({ field: { value, ...field } }) => (
								<div className="flex flex-col gap-y-4">
									<div className="grid gap-y-2">
										<FormItem>
											<FormControl>
												<Input value={value} disabled={isPending} {...field} />
											</FormControl>
											<FormLabel className="capitalize">{field.name}</FormLabel>
										</FormItem>
										<div className="min-h-4">
											<FormMessage />
										</div>
									</div>
									<Button
										type="submit"
										variant="accent"
										className="ml-auto"
										disabled={!form.formState.isValid || isPending || value === user.username}
									>
										Save
									</Button>
								</div>
							)}
						/>
					</form>
				</Form>
			</div>
		</Fragment>
	);
}
