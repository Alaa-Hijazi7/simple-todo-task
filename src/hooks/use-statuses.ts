"use client"

import { useCallback } from "react"
import { TaskStatus } from "@/types"
import { useLocalStorage } from "./useLocalStorge"

const STORAGE_KEY = "task-statuses"

const DEFAULT_STATUSES: TaskStatus[] = [
  { id: "1", name: "Do It", color: "bg-blue-500", order: 1 },
  { id: "2", name: "In Progress", color: "bg-purple-500", order: 2 },
  { id: "3", name: "Done", color: "bg-red-500", order: 3 },
]

export const STATUS_COLORS = [
  "bg-blue-500",
  "bg-purple-500", 
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-gray-500",
]

export function useStatuses() {
  const [statuses, setStatuses, , isHydrated] = useLocalStorage<TaskStatus[]>(
    STORAGE_KEY,
    DEFAULT_STATUSES
  )

  const addStatus = useCallback((name: string, color: string) => {
    const newStatus: TaskStatus = {
      id: Date.now().toString(),
      name: name.trim(),
      color,
      order: statuses.length + 1,
    }
    
    setStatuses(prev => [...prev, newStatus])
    return newStatus
  }, [statuses.length, setStatuses])

  const getStatusById = useCallback((id: string) => {
    return statuses.find(status => status.id === id)
  }, [statuses])

  return {
    statuses,
    isLoading: !isHydrated,
    addStatus,
    getStatusById,
  }
}
