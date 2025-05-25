import { Fragment } from "react";

import { Login } from "@/components/pages/auth/login";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<Fragment>
			<Login />
			{children}
		</Fragment>
	);
}
