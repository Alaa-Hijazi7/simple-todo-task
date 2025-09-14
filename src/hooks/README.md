# Data Management Hooks

This directory contains custom hooks that use the `useLocalStorage` hook to manage application data with persistent storage.

## Available Hooks

### `useLocalStorage<T>`
The base hook for localStorage integration with hydration support.

```typescript
const [value, setValue, removeValue, isHydrated] = useLocalStorage<T>(
  key: string,
  initialValue: T
)
```

### `useTasks`
Manages task data with full CRUD operations.

```typescript
const {
  tasks,
  isLoading,
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
} = useTasks()
```

### `useStatuses`
Manages task status data.

```typescript
const {
  statuses,
  isLoading,
  addStatus,
  getStatusById,
} = useStatuses()
```

### `useAppSettings`
Manages application settings (theme, language, direction).

```typescript
const {
  settings,
  isLoading,
  updateTheme,
  updateLanguage,
  updateDirection,
  resetSettings,
  toggleTheme,
} = useAppSettings()
```

### `useAuth`
Manages user authentication state.

```typescript
const {
  user,
  isAuthenticated,
  isHydrated,
  login,
  logout,
  updateUser,
} = useAuth()
```

### `useAppData`
Comprehensive hook that provides access to all data management hooks.

```typescript
const {
  tasks,
  statuses,
  settings,
  auth,
  isLoading,
} = useAppData()
```

## Usage Examples

### Basic Task Management
```typescript
import { useTasks } from "@/hooks/useTasks"

function TaskComponent() {
  const { tasks, addTask, updateTask, deleteTask, isLoading } = useTasks()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleCreateTask = (taskData) => {
    addTask({
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      isFavorite: false,
    })
  }

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
```

### Theme Management
```typescript
import { useAppSettings } from "@/hooks/useAppSettings"

function ThemeToggle() {
  const { settings, toggleTheme, isLoading } = useAppSettings()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <button onClick={toggleTheme}>
      Current theme: {settings.theme}
    </button>
  )
}
```

## Key Features

- **Hydration Support**: All hooks handle SSR/hydration properly
- **Type Safety**: Full TypeScript support with proper typing
- **Error Handling**: Graceful error handling for localStorage operations
- **Loading States**: Built-in loading states for better UX
- **Persistence**: Data automatically persists across browser sessions
- **Centralized**: All data management is centralized and consistent

## Storage Keys

- `tasks`: Task data
- `task-statuses`: Task status data
- `app-settings`: Application settings
- `auth-user`: User authentication data

## Best Practices

1. Always check `isLoading` or `isHydrated` before rendering data-dependent UI
2. Use the specific hooks (`useTasks`, `useStatuses`, etc.) rather than `useAppData` for better performance
3. Handle errors gracefully when localStorage operations fail
4. Use the provided utility functions rather than direct state manipulation
