import { cn } from "@/lib/utils";
import { BackButton } from "@/components/ui/back-button";

interface HeaderProps extends React.ComponentProps<"header"> {
	backButton?: boolean;
}

function Header({ backButton = true, children, className, ...props }: HeaderProps) {
	return (
		<header
			className={cn(
				"bg-background/75 sticky top-0 z-10 flex items-center gap-x-4 border-b px-4 py-3 backdrop-blur-md",
				className
			)}
			{...props}
		>
			{backButton && <BackButton />}
			<div className="flex flex-col">{children}</div>
		</header>
	);
}

function HeaderTitle({ className, ...props }: React.ComponentProps<"h1">) {
	return <h1 className={cn("text-foreground text-xl font-extrabold", className)} {...props} />;
}

function HeaderDescription({ className, ...props }: React.ComponentProps<"p">) {
	return <p className={cn("text-muted-foreground text-sm font-normal", className)} {...props} />;
}

export { Header, HeaderTitle, HeaderDescription };
