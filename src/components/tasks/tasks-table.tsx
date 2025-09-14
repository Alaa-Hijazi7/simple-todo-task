"use client"

import { useState } from "react"
import { Star, MoreHorizontal } from "lucide-react"
import { useTranslations } from "next-intl"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Task, TaskStatus } from "@/types"
import { TaskActions } from "./task-actions"

interface TasksTableProps {
  tasks: Task[]
  statuses: TaskStatus[]
  onEditTask?: (task: Task) => void
  onDeleteTask?: (task: Task) => void
  onChangeTaskStatus?: (task: Task, status: { name: string; color: string }) => void
  onToggleFavorite?: (task: Task) => void
}

export function TasksTable({ 
  tasks, 
  statuses, 
  onEditTask, 
  onDeleteTask, 
  onChangeTaskStatus,
  onToggleFavorite
}: TasksTableProps) {
  const t = useTranslations("tasks.table")

  const getStatusColor = (status: { name: string; color: string }) => {
    return status?.color || 'bg-gray-500'
  }

  if (tasks.length === 0) {
    return null
  }

  console.log(tasks)

  return (
    <div className="rounded-md border border-input">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center" />
            <TableHead>{t("title")}</TableHead>
            <TableHead>{t("description")}</TableHead>
            <TableHead>{t("status")}</TableHead>
            <TableHead className="w-12 text-center" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => {
            return (
              <TableRow key={task.id}>
                <TableCell className="text-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => onToggleFavorite?.(task)}
                    aria-label={task.isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Star 
                      className={`h-4 w-4 ${
                        task.isFavorite 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-muted-foreground hover:text-yellow-400"
                      }`} 
                    />
                  </Button>
                </TableCell>
                <TableCell className="font-medium text-left rtl:text-right">
                  {task.title}
                </TableCell>
                <TableCell className="max-w-xs text-left rtl:text-right">
                  <div className="truncate">
                    {task.description || t("noDescription")}
                  </div>
                </TableCell>
                <TableCell className="text-left rtl:text-right">
                  <Badge 
                    variant="secondary" 
                    className={`${getStatusColor(task.status)} text-white border-0`}
                  >
                    {task.status.name}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <TaskActions
                    task={task}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                    onChangeStatus={onChangeTaskStatus}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
