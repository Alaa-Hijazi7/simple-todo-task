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
