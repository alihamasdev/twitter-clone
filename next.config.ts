import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true
	},
	images: {
		loader: "custom",
		loaderFile: "./src/lib/supabase/image-loader.tsx"
	},
	experimental: {
		authInterrupts: true,
		staleTimes: {
			dynamic: 30,
			static: 180
		},
		serverActions: {
			bodySizeLimit: "2mb"
		}
	}
};

export default nextConfig;
