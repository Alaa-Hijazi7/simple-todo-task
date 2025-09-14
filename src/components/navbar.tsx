"use client";

import { useAuthContext } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { usePathname, redirect } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Moon, Sun, User, LogOut } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const t = useTranslations("common");
  const { user, isAuthenticated, logout } = useAuthContext();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    redirect({ href: pathname, locale: newLocale });
  };

  const handleSignOut = () => {
    logout();
    redirect({ href: "/auth/login", locale });
  };

  const handleProfileClick = () => {
    redirect({ href: "/user/profile", locale });
  };

  return (
    <nav className="flex items-center justify-between w-full px-6 py-4">
      <Image
        src="/navbar-logo.svg"
        alt="TODO"
        width={93}
        height={28}
        className="h-7"
      />

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLanguageChange}
          className="h-9 w-9"
          aria-label={t("language")}
          data-slot="toggle-language"
        >
          <Globe className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9"
          aria-label={t("theme")}
          data-slot="toggle-theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 p-0"
                aria-label={t("userMenu")}
                data-slot="user-menu"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleProfileClick}>
                <User className="h-4 w-4 mr-2" />
                {t("profile")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} variant="destructive">
                <LogOut className="h-4 w-4 mr-2" />
                {t("exit")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => redirect({ href: "/auth/login", locale })}
            className="h-9"
            data-slot="sign-in"
          >
            {t("signIn")}
          </Button>
        )}
      </div>
    </nav>
  );
}
