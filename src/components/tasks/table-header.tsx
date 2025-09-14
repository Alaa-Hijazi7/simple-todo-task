"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateTaskForm } from "./create-task-form"
import { Task } from "@/types"

interface TableHeaderProps {
  onCreateTask?: (task: any) => void
  onTaskUpdated?: (task: any) => void
  editingTask?: Task | null
  mode?: 'create' | 'edit'
  isDialogOpen?: boolean
  onDialogOpenChange?: (open: boolean) => void
}

export function TableHeader({ 
  onCreateTask, 
  onTaskUpdated, 
  editingTask, 
  mode = 'create',
  isDialogOpen: externalIsDialogOpen,
  onDialogOpenChange: externalOnDialogOpenChange
}: TableHeaderProps) {
  const [internalIsDialogOpen, setInternalIsDialogOpen] = useState(false)
  const t = useTranslations("tasks")

  // Use external dialog state if provided, otherwise use internal state
  const isDialogOpen = externalIsDialogOpen !== undefined ? externalIsDialogOpen : internalIsDialogOpen
  const setIsDialogOpen = externalOnDialogOpenChange || setInternalIsDialogOpen

  const handleTaskCreated = (task: any) => {
    onCreateTask?.(task)
    setIsDialogOpen(false)
  }

  const handleTaskUpdated = (task: any) => {
    onTaskUpdated?.(task)
    setIsDialogOpen(false)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="text-left rtl:text-right">
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {mode === 'create' && (
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4" />
              {t("createNewTask")}
            </Button>
          </DialogTrigger>
        )}
        <DialogContent className="sm:max-w-[425px] p-0">
          <div className="p-6 pb-0">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-lg font-semibold text-left">
                {mode === 'edit' ? t("editTaskDialog.title") : t("createNewTaskDialog.title")}
              </DialogTitle>
            </DialogHeader>
          </div>
          <div className="px-6 pb-6">
            <CreateTaskForm 
              onTaskCreated={handleTaskCreated}
              onTaskUpdated={handleTaskUpdated}
              editingTask={editingTask}
              mode={mode}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
