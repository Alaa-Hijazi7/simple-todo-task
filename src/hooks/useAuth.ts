"use client"

import { useCallback } from "react"
import { AuthUser, AuthState } from "@/types"
import { useLocalStorage } from "./useLocalStorge"

const STORAGE_KEY = "auth-user"

const DEFAULT_AUTH_STATE: AuthState = {
  user: null,
  isAuthenticated: false,
  isHydrated: false,
}

export function useAuth() {
  const [user, setUser, , isHydrated] = useLocalStorage<AuthUser | null>(
    STORAGE_KEY,
    null
  )

  const login = useCallback((userData: AuthUser) => {
    setUser(userData)
  }, [setUser])

  const logout = useCallback(() => {
    setUser(null)
  }, [setUser])

  const updateUser = useCallback((userData: Partial<AuthUser>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }, [user, setUser])

  const isAuthenticated = !!user

  return {
    user,
    isAuthenticated,
    isHydrated,
    login,
    logout,
    updateUser,
  }
}