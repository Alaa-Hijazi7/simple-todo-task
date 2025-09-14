"use client";

import { useState } from "react";
import { MoreHorizontal, Edit, Trash2, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@/types";
import { useStatuses } from "@/hooks/use-statuses";
import { DeleteTaskDialog } from "./delete-task-dialog";

interface TaskActionsProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onChangeStatus?: (task: Task, status: { name: string; color: string }) => void;
}

export function TaskActions({
  task,
  onEdit,
  onDelete,
  onChangeStatus,
}: TaskActionsProps) {
  const t = useTranslations("tasks.actions");
  const { statuses } = useStatuses();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleStatusChange = (status: { name: string; color: string }) => {
    onChangeStatus?.(task, status);
  };

  const handleEdit = () => {
    onEdit?.(task);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = (taskToDelete: Task) => {
    onDelete?.(taskToDelete);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const availableStatuses = statuses.filter(
    (status) => status.name !== task.status.name
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rtl:align-start">
          <DropdownMenuLabel dir="auto">{t("changeTo")}</DropdownMenuLabel>
          {availableStatuses.map((status) => (
            <DropdownMenuItem
              key={status.id}
              onClick={() => handleStatusChange({ name: status.name, color: status.color })}
              className="flex items-center gap-2 rtl:gap-2"
            >
              <div className={`w-3 h-3 rounded-full ${status.color}`} />
              <span className="text-left rtl:text-right">{status.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleEdit}
            className="flex items-center gap-2 rtl:gap-2"
          >
            <Edit className="h-4 w-4" />
            <span className="text-left rtl:text-right">{t("edit")}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className="flex items-center gap-2 rtl:gap-2 text-red-600 focus:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            <span className="text-left rtl:text-right">{t("delete")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DeleteTaskDialog
        task={task}
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
