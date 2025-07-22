"use client";

import { type Provider } from "@supabase/auth-js";

import { axios } from "@/lib/axios";
import { Button } from "@/components/ui/button";

import { GithubIcon, GoogleIcon } from "./auth-icons";

export function OAuthButtons() {
	const handleOAuth = (provider: Provider) => {
		axios.get(`/api/auth/login/${provider}`);
	};

	return (
		<>
			<Button size="lg" className="w-full" onClick={() => handleOAuth("google")}>
				<GoogleIcon />
				Continue with Google
			</Button>
			<Button size="lg" className="w-full" onClick={() => handleOAuth("github")}>
				<GithubIcon />
				Continue with Github
			</Button>
			<div className="flex items-center gap-x-3">
				<span className="w-full border" />
				<span>or</span>
				<span className="w-full border" />
			</div>
		</>
	);
}
