"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { useAppSettings } from "@/hooks/useAppSettings";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isHydrated: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { settings, isLoading, updateTheme, toggleTheme } = useAppSettings();
  const theme = settings.theme;

  useEffect(() => {
    if (!isLoading) {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }
  }, [theme, isLoading]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme: updateTheme, 
      toggleTheme,
      isHydrated: !isLoading 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
