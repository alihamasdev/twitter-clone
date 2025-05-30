import { clsx, type ClassValue } from "clsx";
import {
	differenceInDays,
	differenceInHours,
	differenceInMinutes,
	differenceInSeconds,
	differenceInYears,
	format
} from "date-fns";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function getFullDate(date: Date): string {
	return format(date, "h:mm a · MMM d, yyyy");
}

function getTweetDate(date: Date): string {
	const now = new Date();

	const seconds = differenceInSeconds(now, date);
	if (seconds < 60) return `${seconds}s`;

	const minutes = differenceInMinutes(now, date);
	if (minutes < 60) return `${minutes}m`;

	const hours = differenceInHours(now, date);
	if (hours < 24) return `${hours}h`;

	const days = differenceInDays(now, date);
	if (days === 1) return "1d";

	const years = differenceInYears(now, date);
	if (years > 0) return format(date, "MMM d, yyyy");

	return format(date, "MMM d");
}

export { getFullDate, getTweetDate, cn };
