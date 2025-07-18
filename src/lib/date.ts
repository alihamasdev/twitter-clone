import { differenceInYears, format } from "date-fns";

export function getFullDate(date: Date): string {
	return format(date, "h:mm a · MMM d, yyyy");
}

export function getTweetDate(date: Date): string {
	const now = new Date();

	const years = differenceInYears(now, date);
	if (years > 0) return format(date, "MMM d, yyyy");

	return format(date, "MMM d");
}
