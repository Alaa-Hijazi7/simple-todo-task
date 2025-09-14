"use client"

import { useTasks } from "./useTasks"
import { useStatuses } from "./use-statuses"
import { useAppSettings } from "./useAppSettings"
import { useAuth } from "./useAuth"

/**
 * Comprehensive hook that provides access to all app data management hooks
 * This centralizes data access and makes it easier to manage the application state
 */
export function useAppData() {
  const tasks = useTasks()
  const statuses = useStatuses()
  const settings = useAppSettings()
  const auth = useAuth()

  const isLoading = tasks.isLoading || statuses.isLoading || settings.isLoading || !auth.isHydrated

  return {
    tasks,
    statuses,
    settings,
    auth,
    isLoading,
  }
}
