import { Suspense } from "react";
import { SignUpForm } from "@/components/auth/signup-form";
import { SignUpLoading } from "@/components/auth/signup-loading";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function SignUpPage() {
  const t = await getTranslations("auth.signUp");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-title">{t("title")}</h1>
          <p className="text-subtitle text-sm leading-relaxed">
            {t("description")}
          </p>
        </div>

        <Suspense fallback={<SignUpLoading />}>
          <SignUpForm />
        </Suspense>

        <div className="text-center">
          <p className="text-subtitle text-sm">
            {t("alreadyHaveAccount")}{" "}
            <Link
              href="/auth/login"
              className="text-primary underline font-medium"
            >
              {t("signIn")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
