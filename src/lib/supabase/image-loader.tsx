import { type ImageProps } from "next/image";

const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID!;

export default function ImageLoader({ src, width, quality }: ImageProps) {
	return `https://${projectId}.supabase.co/storage/v1/object/public/${src}?width=${width}&quality=${quality || 75}`;
}
