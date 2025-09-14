"use client"

import { useCallback } from "react"
import { AppSettings } from "@/types"
import { useLocalStorage } from "./useLocalStorge"

const STORAGE_KEY = "app-settings"

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  language: 'en',
  direction: 'ltr',
}

export function useAppSettings() {
  const [settings, setSettings, , isHydrated] = useLocalStorage<AppSettings>(
    STORAGE_KEY,
    DEFAULT_SETTINGS
  )

  const updateTheme = useCallback((theme: 'light' | 'dark') => {
    setSettings(prev => ({
      ...prev,
      theme,
    }))
  }, [setSettings])

  const updateLanguage = useCallback((language: 'en' | 'ar') => {
    setSettings(prev => ({
      ...prev,
      language,
      direction: language === 'ar' ? 'rtl' : 'ltr',
    }))
  }, [setSettings])

  const updateDirection = useCallback((direction: 'ltr' | 'rtl') => {
    setSettings(prev => ({
      ...prev,
      direction,
    }))
  }, [setSettings])

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
  }, [setSettings])

  const toggleTheme = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }))
  }, [setSettings])

  return {
    settings,
    isLoading: !isHydrated,
    updateTheme,
    updateLanguage,
    updateDirection,
    resetSettings,
    toggleTheme,
  }
}
