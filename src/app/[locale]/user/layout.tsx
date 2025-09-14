"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/app-context";
import { redirect } from "@/i18n/navigation";
import { Navbar } from "@/components/navbar";
import { useLocale } from "next-intl";

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const { isAuthenticated, isHydrated } = useAuth();
  const locale = useLocale();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      redirect({ href: "/auth/login", locale });
    }
  }, [isAuthenticated, isHydrated, locale]);

  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
