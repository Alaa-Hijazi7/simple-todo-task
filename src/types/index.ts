// User types
export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

// Authentication types
export interface AuthUser {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isHydrated: boolean
}

// Task types
export interface TaskStatus {
  id: string
  name: string
  color: string
  order: number
}

export interface Task {
  id: string
  title: string
  description?: string
  status: {
    name: string
    color: string
  }
  isFavorite?: boolean
}

// App settings types
export interface AppSettings {
  theme: 'light' | 'dark'
  language: 'en' | 'ar'
  direction: 'ltr' | 'rtl'
}

// Form types
export interface SignUpForm {
  name: string
  email: string
}

export interface SignInForm {
  email: string
}

export interface TaskForm {
  title: string
  description?: string
  status: {
    name: string
    color: string
  }
  dueDate?: string
  priority: 'low' | 'medium' | 'high'
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Pagination types
export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Filter types
export interface TaskFilters {
  status?: string
  priority?: 'low' | 'medium' | 'high'
  userId?: string
  search?: string
}

// Sort types
export interface SortParams {
  field: string
  direction: 'asc' | 'desc'
}
