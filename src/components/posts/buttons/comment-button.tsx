"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { usePostForm } from "@/context/post-form-context";
import { type PostData } from "@/types/post";
import { Icon } from "@/components/ui/icon";
import { NumberAnimation } from "@/components/number-animation";

interface CommentButtonProps extends React.ComponentProps<typeof motion.button> {
	postData: PostData;
}

export function CommentButton({ postData, className, ...props }: CommentButtonProps) {
	const router = useRouter();

	const { setFormParent } = usePostForm();

	const handleClick = () => {
		setFormParent(postData);
		router.push(`/compose/post`);
	};

	return (
		<motion.button onClick={handleClick} className={cn("group flex cursor-pointer items-center", className)} {...props}>
			<div className="group-hover:bg-blue/10 flex-center size-8 rounded-full">
				<Icon id="comment" className="fill-muted-foreground group-hover:fill-blue size-4.5" />
			</div>
			<span className={cn("group-hover:text-blue text-muted-foreground text-sm", postData.comments < 1 && "invisible")}>
				<NumberAnimation value={postData.comments} />
			</span>
		</motion.button>
	);
}
