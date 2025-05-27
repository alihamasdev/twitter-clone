"use client";

import { useRouter } from "next/navigation";

import { Button, type ButtonProps } from "@/components/ui/button";

function BackButton({ variant = "ghost", size = "icon", icon = "back", ...props }: ButtonProps) {
	const router = useRouter();

	const handleBack = () => {
		window.history.length > 1 ? router.back() : router.push("/home");
	};

	return <Button size={size} icon={icon} variant={variant} onClick={handleBack} {...props} />;
}

export { BackButton };
