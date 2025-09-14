"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorge";
import type { AuthUser, AuthState, AppSettings } from "@/types";

interface AppState extends AuthState {
  settings: AppSettings;
  isLoading: boolean;
}

interface AppContextType extends AppState {
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUser: (userData: Partial<AuthUser>) => void;

  updateTheme: (theme: "light" | "dark") => void;
  updateLanguage: (language: "en" | "ar") => void;
  updateDirection: (direction: "ltr" | "rtl") => void;
  resetSettings: () => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Storage keys
const AUTH_STORAGE_KEY = "auth-user";
const SETTINGS_STORAGE_KEY = "app-settings";

const DEFAULT_SETTINGS: AppSettings = {
  theme: "light",
  language: "en",
  direction: "ltr",
};

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser, , isAuthHydrated] = useLocalStorage<AuthUser | null>(
    AUTH_STORAGE_KEY,
    null
  );

  const [settings, setSettings, , isSettingsHydrated] =
    useLocalStorage<AppSettings>(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS);

  const isAuthenticated = !!user;
  const isHydrated = isAuthHydrated && isSettingsHydrated;
  const isLoading = !isHydrated;

  const login = (userData: AuthUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<AuthUser>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const updateTheme = (theme: "light" | "dark") => {
    setSettings((prev) => ({
      ...prev,
      theme,
    }));
  };

  const updateLanguage = (language: "en" | "ar") => {
    setSettings((prev) => ({
      ...prev,
      language,
      direction: language === "ar" ? "rtl" : "ltr",
    }));
  };

  const updateDirection = (direction: "ltr" | "rtl") => {
    setSettings((prev) => ({
      ...prev,
      direction,
    }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  useEffect(() => {
    if (!isLoading) {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(settings.theme);
    }
  }, [settings.theme, isLoading]);

  const contextValue: AppContextType = {
    user,
    isAuthenticated,
    isHydrated,

    settings,
    isLoading,

    login,
    logout,
    updateUser,

    updateTheme,
    updateLanguage,
    updateDirection,
    resetSettings,
    toggleTheme,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

export function useAuth() {
  const { user, isAuthenticated, isHydrated, login, logout, updateUser } =
    useApp();
  return { user, isAuthenticated, isHydrated, login, logout, updateUser };
}

export function useTheme() {
  const { settings, isLoading, updateTheme, toggleTheme } = useApp();
  return {
    theme: settings.theme,
    setTheme: updateTheme,
    toggleTheme,
    isHydrated: !isLoading,
  };
}

export function useAppSettings() {
  const {
    settings,
    isLoading,
    updateTheme,
    updateLanguage,
    updateDirection,
    resetSettings,
    toggleTheme,
  } = useApp();
  return {
    settings,
    isLoading,
    updateTheme,
    updateLanguage,
    updateDirection,
    resetSettings,
    toggleTheme,
  };
}
