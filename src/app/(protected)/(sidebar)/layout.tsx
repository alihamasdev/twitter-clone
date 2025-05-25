import { Aside } from "@/components/modules/aside";
import { Sidebar } from "@/components/modules/sidebar";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="relative container mx-auto flex justify-center sm:gap-2 md:gap-4 xl:gap-8">
			<Sidebar />
			<div className="min-h-dvh w-full max-w-150 sm:border-x">{children}</div>
			<Aside />
		</main>
	);
}
