"use client";

import { useRouter } from "next/navigation";

import { Button, type ButtonProps } from "@/components/ui/button";

interface BackButtonProps extends ButtonProps {
	pushUrl?: string | null;
}

export function BackButton({
	pushUrl = "/home",
	variant = "ghost",
	size = "icon",
	icon = "back",
	...props
}: BackButtonProps) {
	const router = useRouter();

	return (
		<Button
			size={size}
			icon={icon}
			variant={variant}
			onClick={() => (pushUrl ? router.push(pushUrl) : router.back())}
			{...props}
		/>
	);
}
