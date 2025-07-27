import { getLoginUserData } from "@/lib/dal";
import { AuthProvider } from "@/context/auth-context";
import { PostFormProvider } from "@/context/post-form-context";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/layout/search";
import { Sidebar } from "@/components/layout/sidebar";
import { SuggestedUsers } from "@/components/user/suggested-users";

export default function ProtectedLayout({ children, dialog }: React.PropsWithChildren<{ dialog: React.ReactNode }>) {
	const user = getLoginUserData();

	return (
		<AuthProvider userPromise={user}>
			<PostFormProvider>
				<main className="relative container mx-auto flex justify-center sm:gap-2 md:gap-4 xl:gap-8">
					<header className="sticky top-0 hidden h-dvh max-w-65 min-w-20 overflow-y-auto px-1 py-4 sm:flex sm:flex-col xl:w-full">
						<Sidebar />
					</header>
					<div className="min-h-dvh w-full max-w-150 sm:border-x">
						{dialog}
						{children}
					</div>
					<aside className="sticky top-0 hidden h-dvh w-full max-w-88 min-w-75 space-y-4 overflow-y-auto px-1 py-4 lg:block">
						<Search />
						<section className="bg-card text-card-foreground rounded-2xl border px-4 py-3">
							<h1 className="text-xl font-extrabold">Fork it on GitHub</h1>
							<p className="mt-2 mb-3 text-base">
								Explore the codebase behind Twitter and contribute to its development.
							</p>
							<a href="https://github.com/alihamasdev/twitter-clone" target="_blank" rel="noopener noreferrer">
								<Button variant="accent">Repository</Button>
							</a>
						</section>
						<SuggestedUsers />
						<p className="text-muted-foreground text-center text-sm">
							&#169; {new Date().getFullYear()} Ali Hamas, Inc.
						</p>
					</aside>
				</main>
			</PostFormProvider>
		</AuthProvider>
	);
}
