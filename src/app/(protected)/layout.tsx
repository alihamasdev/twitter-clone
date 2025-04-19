import { Fragment } from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
	return <Fragment>{children}</Fragment>;
}
