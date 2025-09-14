"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { STATUS_COLORS } from "@/hooks/use-statuses";
import { cn } from "@/lib/utils";

interface CreateStatusDialogProps {
  onStatusCreated: (name: string, color: string) => void;
  children?: React.ReactNode;
}

export function CreateStatusDialog({
  onStatusCreated,
  children,
}: CreateStatusDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(STATUS_COLORS[0]);
  const [isCreating, setIsCreating] = useState(false);
  const t = useTranslations("common.toDoStatus");
  const tDialog = useTranslations("common.statusDialog");

  const handleCreate = async () => {
    if (!name.trim()) return;

    setIsCreating(true);
    try {
      onStatusCreated(name.trim(), selectedColor);
      setName("");
      setSelectedColor(STATUS_COLORS[0]);
      setOpen(false);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            {t("createNewStatus")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{tDialog("title")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status-name">{tDialog("statusTitle")}</Label>
            <Input
              id="status-name"
              placeholder={tDialog("statusTitle")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCreate();
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>{tDialog("selectColor")}</Label>
            <div className="flex flex-wrap gap-2">
              {STATUS_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={cn(
                    "w-8 h-8 rounded-md border-2 transition-all hover:scale-110",
                    color,
                    selectedColor === color
                      ? "border-red-500"
                      : "border-gray-200"
                  )}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleCreate}
              disabled={!name.trim() || isCreating}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              {isCreating ? tDialog("creating") : tDialog("create")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
