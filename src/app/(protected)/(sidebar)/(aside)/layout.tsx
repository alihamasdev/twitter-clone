import { Fragment } from "react";

import { Aside } from "@/components/modules/aside";

export default function AsideLayout({ children }: { children: React.ReactNode }) {
	return (
		<Fragment>
			<div className="min-h-dvh w-full max-w-150 sm:border-x">{children}</div>
			<Aside />
		</Fragment>
	);
}
