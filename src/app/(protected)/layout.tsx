import { AuthProvider } from "@/context/auth-context";

import { getLoginUserData } from "@/lib/dal";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
	const user = getLoginUserData();
	return <AuthProvider userPromise={user}>{children}</AuthProvider>;
}
