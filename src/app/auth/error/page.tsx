import { type Metadata } from "next";

import { ErrorDialog } from "@/components/dialogs/error.dialog";

export const metadata: Metadata = {
	title: "Auth Error"
};

export default function AuthErrorPage() {
	return <ErrorDialog />;
}
