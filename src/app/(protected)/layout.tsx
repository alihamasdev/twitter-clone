import { Suspense } from "react";

import { getLoginUser } from "@/actions/auth/get-login-user";
import { AuthProvider } from "@/context/auth-context";

import RootLoading from "@/app/loading";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
	const userPromise = getLoginUser();

	return (
		<Suspense fallback={<RootLoading />}>
			<AuthProvider userPromise={userPromise}>{children}</AuthProvider>
		</Suspense>
	);
}
