"use client";

import { useState } from "react";
import NextLink from "next/link";

export function Link({ ...props }: React.ComponentProps<typeof NextLink>) {
	const [hover, setHover] = useState(false);

	return <NextLink onMouseEnter={() => setHover(true)} prefetch={hover} {...props} />;
}
