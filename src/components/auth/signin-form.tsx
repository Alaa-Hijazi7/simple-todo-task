"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
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
import { useAuth } from "@/contexts/app-context";

export function SignInForm() {
  const t = useTranslations("auth.signIn");
  const router = useRouter();
  const { login } = useAuth();

  const formSchema = z.object({
    email: z.email(t("validation.emailInvalid")),
    password: z
      .string()
      .min(1, t("validation.passwordRequired"))
      .min(8, t("validation.passwordMinLength")),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: FormData) => {
    const mockUser = {
      id: `user_${Date.now()}`,
      email: data.email,
      name: data.email.split("@")[0], // Extract name from email
      createdAt: new Date().toISOString(),
    };
    login(mockUser);

    router.push("/user/tasks-list");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-title font-semibold">
                {t("email")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("email")}
                  type="email"
                  className="border-gray-300 focus:border-gray-400 focus:ring-gray-400 text-title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-title font-semibold">
                {t("password")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("password")}
                  type="password"
                  className="border-gray-300 focus:border-gray-400 focus:ring-gray-400 text-title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="default"
          className="w-full h-10"
        >
          {t("signIn")}
        </Button>
      </form>
    </Form>
  );
}
