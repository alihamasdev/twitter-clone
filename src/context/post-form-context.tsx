"use client";

import { createContext, use, useState } from "react";

import { PostData } from "@/types/post";

type ContextType = {
	formParent: PostData | null;
	setFormParent: React.Dispatch<React.SetStateAction<PostData | null>>;
};

const PostFormContext = createContext<ContextType | null>(null);

export function PostFormProvider(props: { children: React.ReactNode }) {
	const [formParent, setFormParent] = useState<PostData | null>(null);

	return <PostFormContext value={{ formParent, setFormParent }} {...props} />;
}

export function usePostForm(): ContextType {
	const formContext = use(PostFormContext);

	if (!formContext) {
		throw new Error("useFormPost should be used within <PostFormProvider>");
	}

	return formContext;
}
