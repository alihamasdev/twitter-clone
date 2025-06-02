"use client";

import { createContext, use } from "react";

import { useLocalStorage } from "@/hooks/use-local-storage";

export const themeColors = ["light", "dim", "dark"] as const;
export type ThemeColors = (typeof themeColors)[number];

export const accentColors = ["blue", "green", "pink", "yellow", "purple", "orange"] as const;
export type AccentColors = (typeof accentColors)[number];

interface AccentContextType {
	theme: ThemeColors;
	setTheme: React.Dispatch<React.SetStateAction<ThemeColors>>;
	accent: AccentColors;
	setAccent: React.Dispatch<React.SetStateAction<AccentColors>>;
}

const ThemeContext = createContext<AccentContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useLocalStorage<ThemeColors>(`theme`, `dark`);
	const [accent, setAccent] = useLocalStorage<AccentColors>(`accent`, `blue`);

	return <ThemeContext value={{ theme, setTheme, accent, setAccent }}>{children}</ThemeContext>;
}

export function useTheme() {
	const themeContext = use(ThemeContext);

	if (!themeContext) {
		throw new Error("useTheme should be used within <ThemeProvider>");
	}

	return themeContext;
}
