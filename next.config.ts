import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	trailingSlash: true,
	images: {
		remotePatterns: [
			{ hostname: "avatars.githubusercontent.com", protocol: "https" },
			{ hostname: "lh3.googleusercontent.com", protocol: "https" },
			{ hostname: "*.supabase.co", protocol: "https" }
		]
	},
	experimental: {
		staleTimes: {
			dynamic: 30,
			static: 180
		}
	}
};

export default nextConfig;
