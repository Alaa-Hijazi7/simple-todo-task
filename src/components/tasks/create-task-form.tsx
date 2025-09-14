"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task, TaskForm } from "@/types";
import { CreateStatusDialog } from "./create-status-dialog";
import { useStatuses } from "@/hooks/use-statuses";

interface CreateTaskFormProps {
  onTaskCreated?: (task: any) => void;
  onTaskUpdated?: (task: any) => void;
  editingTask?: Task | null;
  mode?: 'create' | 'edit';
}

export function CreateTaskForm({ 
  onTaskCreated, 
  onTaskUpdated, 
  editingTask, 
  mode = 'create' 
}: CreateTaskFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations("tasks.form");
  const tCommon = useTranslations("common.toDoStatus");

  const taskFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    description: z.string().optional(),
    status: z.object({
      name: z.string().min(1, "Status is required"),
      color: z.string().min(1, "Color is required"),
    }),
  });

  type TaskFormValues = z.infer<typeof taskFormSchema>;

  const { statuses, addStatus } = useStatuses();

  const handleStatusCreated = (name: string, color: string) => {
    const newStatus = addStatus(name, color);
    form.setValue("status", { name: newStatus.name, color: newStatus.color });
  };

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: editingTask?.title || "",
      description: editingTask?.description || "",
      status: editingTask?.status || { name: "", color: "" },
    },
  });

  // Update form values when editingTask changes
  React.useEffect(() => {
    if (editingTask && mode === 'edit') {
      form.reset({
        title: editingTask.title,
        description: editingTask.description || "",
        status: editingTask.status,
      });
    } else if (mode === 'create') {
      form.reset({
        title: "",
        description: "",
        status: { name: "", color: "" },
      });
    }
  }, [editingTask, mode, form]);

  const onSubmit = async (values: TaskFormValues) => {
    try {
      if (mode === 'edit' && editingTask) {
        const updatedTask = {
          ...editingTask,
          ...values,
        };
        onTaskUpdated?.(updatedTask);
      } else {
        const newTask = {
          ...values,
          id: Date.now().toString(),
        };
        onTaskCreated?.(newTask);
      }
      form.reset();
    } catch (error) {
      console.error(`Error ${mode === 'edit' ? 'updating' : 'creating'} task:`, error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                {t("title")}
              </FormLabel>
              <FormControl>
                <Input placeholder={t("titlePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                {t("description")}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("descriptionPlaceholder")}
                  className="min-h-[80px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                {t("status")}
              </FormLabel>
              <Select 
                onValueChange={(value) => {
                  const selectedStatus = statuses.find(s => s.name === value);
                  if (selectedStatus) {
                    field.onChange({ name: selectedStatus.name, color: selectedStatus.color });
                  }
                }} 
                value={field.value?.name || ""}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("statusPlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.id} value={status.name}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${status.color}`}
                        />
                        {status.name}
                      </div>
                    </SelectItem>
                  ))}

                  <div className="border-t border-input pt-1 mt-1">
                    <CreateStatusDialog onStatusCreated={handleStatusCreated}>
                      <div className="relative flex justify-center cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                        {tCommon("createNewStatus")}
                      </div>
                    </CreateStatusDialog>
                  </div>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="default"
          className="w-full"
        >
          {isSubmitting 
            ? (mode === 'edit' ? t("updating") : t("creating"))
            : (mode === 'edit' ? t("updateTask") : t("createTask"))
          }
        </Button>
      </form>
    </Form>
  );
}
