import { Fragment } from "react";

import { Spinner } from "@/components/ui/spinner";
import { Header, HeaderTitle } from "@/components/layout/header";

export default function AccountLoading() {
	return (
		<Fragment>
			<Header>
				<HeaderTitle>Account Information</HeaderTitle>
			</Header>
			<Spinner />
		</Fragment>
	);
}
