import { Suspense } from "react";
import { AuthProvider } from "@/context/auth-context";

import { getLoginUser } from "@/actions/auth/get-login-user";

import RootLoading from "@/app/loading";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
	const userPromise = getLoginUser();

	return (
		<Suspense fallback={<RootLoading />}>
			<AuthProvider userPromise={userPromise}>{children}</AuthProvider>
		</Suspense>
	);
}
