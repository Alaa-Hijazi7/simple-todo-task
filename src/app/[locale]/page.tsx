"use client";

import { useEffect } from "react";
import { useAuthContext } from "@/contexts/auth-context";
import { redirect } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function Home() {
  const { isAuthenticated, isHydrated } = useAuthContext();
  const t = useTranslations("common");
  const locale = useLocale();

  useEffect(() => {
    if (!isHydrated) return;

    if (isAuthenticated) {
      redirect({ href: "/user/tasks-list", locale });
    } else {
      redirect({ href: "/auth/login", locale });
    }
  }, [isAuthenticated, isHydrated, locale]);

  if (!isHydrated) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">{t("projectTitle")}</h1>
          <p className="text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return null;
}
