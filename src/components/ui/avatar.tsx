"use client";
import Image, { type ImageProps } from "next/image";
import { Fragment } from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const placeholder =
	"data:image/webp;base64,UklGRn4CAABXRUJQVlA4THECAAAvJ8AJAGfEoG0bQeEP8Nl8Lf0ehIG0bepf2y19MZC2Tf17vJQv8y8kSKJNbjx3E6UgRaL8C4ISlKRQDJEUhBSJ+K8MYbgZAFIAJEpQICkGMJQAAATCAMn7LxGQDAEU2D8CBdko3h8bUBKRgDASAduczOZAAMadf6JzHvKExS0lIpHIurbtrCOkqW3btm3bNsc2yzQ/uzv77RzNYfJ9X5y8iej/BAT8B+QQ8R9APio2QdYchk/Ex2SV1rWYqkYoexI+ubxnenUddY25Fv8EvFU9uvX83RfXVAxiWwyMo2Xk4MOVQAhBzxm1KAfFZ/Zserfio4anMuSBAqMrZl5ciT5RnVE8HYZLbFn7KPgi1G5JQhg+vXf/54MvDfd1gwHljpz8FSXaFjpAoYVjF1dSUFcLbZiwoolnN1JUdIo8oMLxyyspaBuFQHze8PEfKYZmewwmOLVr+wvxRVynSwmG4WKr5i5+3ZEH09SIo+hyVSzCsNCMjsWzt9+V30zRVdnS7NAAYIzKbRtf2Tk4oo7HjLbcKIRiGJFSUt/ZN6BYnQZ1VWTwGBablk/LXUqY5mEAPIYn5lQ0dnTLmqcYlCBUUEh8QcPg7OrGLlF0l9lavGGBoJpWPbR8+PL91x+W7BiHypDNVATAyOzW2f3XP2+ER1X0TNfJjuT8CgzPal84/3oriD6JITOdZoUH+sOnNM9f/BRMyQR1qrrMDy6ucurUIqKfxHIpi0NpYbn9u5/vRb+9zwSdMElcXM38qysR8NqmtXGcFD6jd++bAEGYptu8lIjiycsrExRtT1YlcDHVi2/uYByyZFOUEN+09kmAIZrd5D4CAA==";

interface AvatarProps extends React.ComponentProps<"div"> {
	asChild?: boolean;
}

function Avatar({ asChild, className, ...props }: AvatarProps) {
	const Comp = asChild ? Slot : "div";

	return (
		<Comp
			data-slot="avatar"
			className={cn("bg-muted relative flex size-10 shrink-0 cursor-pointer overflow-hidden rounded-full", className)}
			{...props}
		/>
	);
}

interface AvatarImageProps extends Partial<React.ComponentProps<typeof Image>> {
	src: ImageProps["src"];
}

function AvatarImage({ src, className, ...props }: AvatarImageProps) {
	return (
		<Fragment>
			<Image
				data-slot="avatar-image"
				src={src}
				width={40}
				height={40}
				alt="avatar"
				placeholder={placeholder}
				className={cn("aspect-square size-full transition-[opacity] duration-300 hover:opacity-80", className)}
				{...props}
			/>
		</Fragment>
	);
}

export { Avatar, AvatarImage };
