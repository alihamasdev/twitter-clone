import Form from "next/form";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

import { GithubIcon, GoogleIcon } from "./auth-icons";

export function Login() {
	return (
		<main className="flex min-h-dvh flex-col items-center justify-center gap-y-10 md:flex-row md:gap-x-10 lg:gap-x-25 xl:gap-x-50">
			<section className="flex lg:items-center lg:justify-center">
				<Icon id="twitter" className="size-10 sm:size-20 md:size-60 lg:size-90" />
			</section>
			<section className="flex flex-col">
				<h1 className="mb-10 text-4xl font-black sm:text-5xl">Happening now</h1>
				<h2 className="mb-8 text-2xl font-black sm:text-3xl">Join today.</h2>
				<div className="w-75 space-y-3 *:w-full">
					<Form action={`/api/auth/login/google`}>
						<Button type="submit" size="lg" className="w-full">
							<GoogleIcon />
							Continue with Google
						</Button>
					</Form>
					<Form action={`/api/auth/login/github`}>
						<Button type="submit" size="lg" className="w-full">
							<GithubIcon />
							Continue with Github
						</Button>
					</Form>
					<div className="flex items-center gap-x-3">
						<span className="w-full border" />
						<span>or</span>
						<span className="w-full border" />
					</div>
					<Button size="lg" variant="accent" className="w-full" disabled>
						Sign up with email
					</Button>
					<h3 className="!mt-12 text-base font-bold sm:text-lg">Already have an account?</h3>
					<Button size="lg" variant="outline" className="w-full" disabled>
						Log in
					</Button>
				</div>
			</section>
		</main>
	);
}
