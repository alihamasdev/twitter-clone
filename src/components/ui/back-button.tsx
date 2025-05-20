"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type BackButtonProps = Omit<React.ComponentProps<typeof Button>, "onClick">;

function BackButton({ variant = "ghost", size = "icon", icon = "back", ...props }: BackButtonProps) {
	const router = useRouter();

	return (
		<Button
			data-slot="back-button"
			size={size}
			icon={icon}
			variant={variant}
			aria-label={props["aria-label"] || "Back"}
			onClick={() => router.back()}
			{...props}
		/>
	);
}

export { BackButton, type BackButtonProps };
