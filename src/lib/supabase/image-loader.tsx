import { type ImageLoaderProps } from "next/image";

import { supabaseProjectId } from "@/utils/contants";

export default function ImageLoader({ src, width, quality }: ImageLoaderProps) {
	return `https://${supabaseProjectId}.supabase.co/storage/v1/object/public/${src}?width=${width}&quality=${quality || 75}`;
}
