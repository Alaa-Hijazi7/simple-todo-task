"use client"

import { useCallback } from "react"
import { Task } from "@/types"
import { useLocalStorage } from "./useLocalStorge"

const STORAGE_KEY = "tasks"

const DEFAULT_TASKS: Task[] = []

export function useTasks() {
  const [tasks, setTasks, , isHydrated] = useLocalStorage<Task[]>(
    STORAGE_KEY,
    DEFAULT_TASKS
  )

  const addTask = useCallback((newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
    }
    
    setTasks(prev => [task, ...prev])
    return task
  }, [setTasks])

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks(prev => 
      prev.map(task => task.id === updatedTask.id ? updatedTask : task)
    )
    return updatedTask
  }, [setTasks])

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }, [setTasks])

  const toggleFavorite = useCallback((taskId: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, isFavorite: !task.isFavorite }
          : task
      )
    )
  }, [setTasks])

  const changeTaskStatus = useCallback((
    taskId: string, 
    status: { name: string; color: string }
  ) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, status }
          : task
      )
    )
  }, [setTasks])

  const getTaskById = useCallback((id: string) => {
    return tasks.find(task => task.id === id)
  }, [tasks])

  const getTasksByStatus = useCallback((statusName: string) => {
    return tasks.filter(task => task.status.name === statusName)
  }, [tasks])

  const getFavoriteTasks = useCallback(() => {
    return tasks.filter(task => task.isFavorite)
  }, [tasks])

  const searchTasks = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return tasks.filter(task => 
      task.title.toLowerCase().includes(lowercaseQuery) ||
      (task.description && task.description.toLowerCase().includes(lowercaseQuery))
    )
  }, [tasks])

  const clearAllTasks = useCallback(() => {
    setTasks([])
  }, [setTasks])

  return {
    tasks,
    isLoading: !isHydrated,
    addTask,
    updateTask,
    deleteTask,
    toggleFavorite,
    changeTaskStatus,
    getTaskById,
    getTasksByStatus,
    getFavoriteTasks,
    searchTasks,
    clearAllTasks,
  }
}
