"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function SignUpForm() {
  const t = useTranslations("auth.signUp");
  const router = useRouter();
  const { login } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const signUpSchema = z.object({
    name: z.string().min(1, t("validation.nameRequired")),
    email: z.email(t("validation.emailInvalid")),
    password: z.string().min(8, t("validation.passwordMinLength")),
  });
  type SignUpFormData = z.infer<typeof signUpSchema>;

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const newUser = {
        id: `user_${Date.now()}`,
        email: data.email,
        name: data.name,
        createdAt: new Date().toISOString(),
      };
      login(newUser);

      router.push("/user/tasks-list");
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={profileImage || ""} alt="Profile" />
            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
              <User className="w-8 h-8" />
            </AvatarFallback>
          </Avatar>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="profile-upload"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById("profile-upload")?.click()}
              className="flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>{t("upload", { defaultValue: "Upload" })}</span>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">{t("name")}</Label>
          <Input
            id="name"
            type="text"
            placeholder={t("name")}
            {...form.register("name")}
            className="w-full"
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-600">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("email")}
            {...form.register("email")}
            className="w-full"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-600">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{t("password")}</Label>
          <Input
            id="password"
            type="password"
            placeholder={t("password")}
            {...form.register("password")}
            className="w-full"
          />
          <p className="text-xs text-gray-500">{t("passwordHelper")}</p>
          {form.formState.errors.password && (
            <p className="text-sm text-red-600">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3"
        >
          {t("signUp")}
        </Button>
      </form>
    </Form>
  );
}
