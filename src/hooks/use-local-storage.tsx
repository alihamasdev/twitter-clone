"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export function useLocalStorage<T extends string>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
	const [value, setValue] = useState<T>(() => {
		if (typeof window === undefined) return initialValue;
		try {
			const storedValue = window.localStorage.getItem(key) as T | null;
			return storedValue ? storedValue : initialValue;
		} catch (error) {
			console.error(error);
			return initialValue;
		}
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem(key, value);
			if (key === "theme") {
				document.documentElement.className = value;
			}
			if (key === "accent") {
				document.documentElement.setAttribute("data-accent", value);
			}
		}
	}, [key, value]);

	return [value, setValue];
}
