"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { TableHeader } from "@/components/tasks/table-header";
import { TaskFilters } from "@/components/tasks/task-filters";
import { TasksTable } from "@/components/tasks/tasks-table";
import { EmptyState } from "@/components/tasks/empty-state";
import { Pagination } from "@/components/tasks/pagination";
import { Task, TaskStatus } from "@/types";
import { useTasks } from "@/hooks/useTasks";
import { useStatuses } from "@/hooks/use-statuses";

export default function TasksListPage() {
  const t = useTranslations("common.toDoStatus");
  
  // Use hooks for data management
  const { 
    tasks, 
    isLoading: tasksLoading, 
    addTask, 
    updateTask, 
    deleteTask, 
    toggleFavorite, 
    changeTaskStatus 
  } = useTasks();
  
  const { statuses, isLoading: statusesLoading } = useStatuses();

  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");

  const itemsPerPage = 7;
  const totalItems = filteredTasks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  useEffect(() => {
    let filtered = tasks;

    if (searchValue) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          (task.description &&
            task.description.toLowerCase().includes(searchValue.toLowerCase()))
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status.name === statusFilter);
    }

    const sortedTasks = filtered.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;

      return a.title.localeCompare(b.title);
    });

    setFilteredTasks(sortedTasks);
    setCurrentPage(1);
  }, [tasks, searchValue, statusFilter]);

  const handleCreateTask = (newTask: any) => {
    addTask({
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      isFavorite: false,
    });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogMode("edit");
    setShowCreateDialog(true);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    updateTask(updatedTask);
    setEditingTask(null);
    setDialogMode("create");
  };

  const handleDeleteTask = (task: Task) => {
    deleteTask(task.id);
  };

  const handleChangeTaskStatus = (
    task: Task,
    status: { name: string; color: string }
  ) => {
    changeTaskStatus(task.id, status);
  };

  const handleToggleFavorite = (task: Task) => {
    toggleFavorite(task.id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDialogClose = (open: boolean) => {
    setShowCreateDialog(open);
    if (!open) {
      setEditingTask(null);
      setDialogMode("create");
    }
  };

  // Show loading state while data is being hydrated
  if (tasksLoading || statusesLoading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-left rtl:text-right">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 w-full bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <TableHeader
        onCreateTask={handleCreateTask}
        onTaskUpdated={handleTaskUpdated}
        editingTask={editingTask}
        mode={dialogMode}
        isDialogOpen={showCreateDialog}
        onDialogOpenChange={handleDialogClose}
      />

      <TaskFilters
        searchValue={searchValue}
        statusValue={statusFilter}
        onSearchChange={setSearchValue}
        onStatusChange={setStatusFilter}
      />

      {filteredTasks.length === 0 ? (
        <EmptyState onCreateTask={() => setShowCreateDialog(true)} />
      ) : (
        <>
          <TasksTable
            tasks={paginatedTasks}
            statuses={statuses}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onChangeTaskStatus={handleChangeTaskStatus}
            onToggleFavorite={handleToggleFavorite}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
