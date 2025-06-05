"use client";

import { toast } from "react-hot-toast";

import { baseUrl } from "@/utils/contants";

export function copyToClipboard(postUrl: string) {
	if (navigator) {
		navigator.clipboard
			.writeText(`${baseUrl}${postUrl}`)
			.then(() => toast.success(`Copied to clipboard`))
			.catch(() => {});
	}
}

export function webShare(postUrl: string) {
	if (navigator.share) {
		navigator.share({ title: `${baseUrl}${postUrl}` }).catch(() => {});
	}
}
