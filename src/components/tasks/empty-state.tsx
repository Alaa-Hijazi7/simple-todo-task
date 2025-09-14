"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface EmptyStateProps {
  onCreateTask?: () => void;
}

export function EmptyState({ onCreateTask }: EmptyStateProps) {
  const t = useTranslations("tasks.emptyState");

  return (
    <div className="flex items-center justify-center py-12 px-4 w-full">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 max-w-md w-full text-center">
        <Image
          src="/empty-status-icon.svg"
          alt="Ghost"
          width={100}
          height={100}
          className="mb-6 mx-auto"
        />

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {t("title")}
        </h3>

        <p className="text-gray-600 mb-4">{t("description1")}</p>

        <p className="text-gray-600 mb-6">{t("description2")}</p>

        <Button onClick={onCreateTask}>
          <Plus className="mr-2 h-4 w-4" />
          {t("createNewStatus")}
        </Button>
      </div>
    </div>
  );
}
