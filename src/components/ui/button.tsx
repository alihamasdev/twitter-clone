import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { Icon, type IconId } from "@/components/ui/icon";

const buttonVariants = cva(
	[
		"inline-flex items-center justify-center gap-x-2 rounded-full font-bold whitespace-nowrap outline-none transition-colors cursor-pointer",
		"disabled:opacity-50 disabled:cursor-not-allowed",
		"[&_svg]:shrink-0 [&_svg]:pointer-events-none"
	],
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				accent: "bg-accent text-accent-foreground hover:bg-accent/90",
				destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 ",
				outline: "border border-input bg-transparent hover:bg-muted",
				ghost: "text-foreground hover:bg-muted"
			},
			size: {
				sm: "h-8 px-4 text-sm",
				default: "h-9 px-4 text-base",
				lg: "h-10 px-4 text-base",
				xl: "h-11 px-6 text-lg w-full",
				xxl: "h-13 px-8 text-lg w-full",
				icon: "size-9"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	}
);

interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
	icon?: IconId;
}

function Button({ variant, size, icon, className, type = "button", children, ...props }: ButtonProps) {
	return (
		<button data-slot="button" type={type} className={cn(buttonVariants({ variant, size, className }))} {...props}>
			{icon && <Icon id={icon} />}
			{children}
		</button>
	);
}

export { Button, buttonVariants, type ButtonProps };
