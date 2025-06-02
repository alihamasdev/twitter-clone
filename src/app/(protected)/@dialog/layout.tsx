"use client";

import { useRouter } from "next/navigation";

import { Dialog } from "@/components/ui/dialog";

export default function SettingsDialogLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const handleClose = () => {
		history.length > 1 ? router.back() : router.push("/home");
	};

	return (
		<Dialog open={true} onOpenChange={handleClose}>
			{children}
		</Dialog>
	);
}
