import { Fragment } from "react";

import { Spinner } from "@/components/ui/spinner";
import { Header, HeaderTitle } from "@/components/layout/header";

export default function UsernameLoading() {
	return (
		<Fragment>
			<Header>
				<HeaderTitle>Change username</HeaderTitle>
			</Header>
			<Spinner />
		</Fragment>
	);
}
