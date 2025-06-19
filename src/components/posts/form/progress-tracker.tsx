import { motion } from "motion/react";

const fadeAnimation = {
	initial: { scale: 0, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	exit: { scale: 0, opacity: 0 },
	transition: { duration: 0.2 }
} satisfies React.ComponentProps<typeof motion>;

export function ProgressTracker({ inputLength }: { inputLength: number }) {
	const maxLength = 300;

	const radius = 20;
	const circumference = 2 * Math.PI * radius;
	const remaining = maxLength - inputLength;
	const progress = Math.min((inputLength / maxLength) * 100, 100);
	const strokeDashoffset = circumference - (progress / 100) * circumference;

	const getStrokeColor = () => {
		if (remaining <= 20 && remaining > 0) return "var(--color-yellow)";
		if (remaining <= 0) return "var(--color-destructive)";
		return "var(--color-accent)";
	};

	return (
		<motion.div className="relative" {...fadeAnimation}>
			<svg viewBox="0 0 48 48" className="size-6 -rotate-90 transform">
				<circle cx="24" cy="24" r={radius} fill="none" stroke="var(--color-muted)" strokeWidth="6" />
				<motion.circle
					cx="24"
					cy="24"
					r={radius}
					fill="none"
					strokeWidth="6"
					stroke={getStrokeColor()}
					transition={{ duration: 0.5, ease: "easeInOut" }}
					initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
					animate={{ strokeDasharray: circumference, strokeDashoffset }}
					className="transition-all duration-300 ease-in-out"
					strokeLinecap="round"
				/>
			</svg>
			{remaining <= 20 && (
				<motion.span
					style={{ color: getStrokeColor() }}
					className="absolute-center text-xs font-normal"
					{...fadeAnimation}
				>
					{remaining}
				</motion.span>
			)}
		</motion.div>
	);
}
