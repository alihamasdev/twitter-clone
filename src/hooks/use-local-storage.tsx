"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export function useLocalStorage<T extends string>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
	const [value, setValue] = useState<T>(() => {
		if (typeof window === "undefined") return initialValue;
		try {
			const storedValue = window.localStorage.getItem(key) as T | null;
			return storedValue !== null ? storedValue : initialValue;
		} catch (error) {
			console.error("Error reading localStorage:", error);
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			window.localStorage.setItem(key, value);
		} catch (error) {
			console.error("Error writing to localStorage:", error);
		}
	}, [key, value]);

	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === key && event.newValue !== null && event.newValue !== value) {
				setValue(event.newValue as T);
			}
		};

		window.addEventListener("storage", handleStorageChange);

		return () => window.removeEventListener("storage", handleStorageChange);
	}, [key, value]);

	return [value, setValue];
}
