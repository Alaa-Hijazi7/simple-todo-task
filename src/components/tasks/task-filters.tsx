"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateStatusDialog } from "./create-status-dialog";
import { useStatuses } from "@/hooks/use-statuses";

interface TaskFiltersProps {
  searchValue: string;
  statusValue: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export function TaskFilters({
  searchValue,
  statusValue,
  onSearchChange,
  onStatusChange,
}: TaskFiltersProps) {
  const t = useTranslations("tasks.filters");
  const { statuses, addStatus } = useStatuses();

  const allStatusesOption = { id: "all", name: "all" };
  const statusOptions = [allStatusesOption, ...statuses];

  const handleStatusCreated = (name: string, color: string) => {
    const newStatus = addStatus(name, color);
    onStatusChange(newStatus.name);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={t("search")}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
          type="search"
        />
      </div>

      <Select value={statusValue} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t("status")} />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((status) => (
            <SelectItem key={status.id} value={status.name}>
              <div className="flex items-center gap-2">
                {status.id !== "all" && "color" in status && (
                  <div className={`w-3 h-3 rounded-full ${status.color}`} />
                )}
                {status.id !== "all" ? status.name : t("allStatuses")}
              </div>
            </SelectItem>
          ))}

          <div className="border-t border-input pt-1 mt-1">
            <CreateStatusDialog onStatusCreated={handleStatusCreated}>
              <div className="relative flex cursor-pointer select-none items-center justify-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                {t("createNewStatus")}
              </div>
            </CreateStatusDialog>
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}
