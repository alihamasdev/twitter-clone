import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		loader: "custom",
		loaderFile: "./src/lib/supabase/image-loader.tsx"
	},
	experimental: {
		staleTimes: {
			dynamic: 30,
			static: 180
		}
	}
};

export default nextConfig;
