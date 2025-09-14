"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Task } from "@/types";

interface DeleteTaskDialogProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (task: Task) => void;
}

export function DeleteTaskDialog({
  task,
  isOpen,
  onClose,
  onConfirm,
}: DeleteTaskDialogProps) {
  const t = useTranslations("tasks.deleteDialog");

  const handleConfirm = () => {
    if (task) {
      onConfirm(task);
      onClose();
    }
  };

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-start">{t("title")}</DialogTitle>
          <DialogDescription className="text-start">
            {t("description", { taskTitle: task.title })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            {t("cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            className="w-full sm:w-auto"
          >
            {t("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
