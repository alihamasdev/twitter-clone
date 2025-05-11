import { getLoginUser } from "@/actions/auth/get-login-user";
import { AuthProvider } from "@/context/auth-context";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
	const user = await getLoginUser();
	return <AuthProvider user={user}>{children}</AuthProvider>;
}
