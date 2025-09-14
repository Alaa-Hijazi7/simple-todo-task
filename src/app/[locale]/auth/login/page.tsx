import { Suspense } from "react";
import { SignInForm } from "@/components/auth/signin-form";
import { SignInLoading } from "@/components/auth/signin-loading";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function LoginPage() {
  const t = await getTranslations("auth.signIn");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-title">{t("title")}</h1>
          <h5 className="text-subtitle text-sm leading-relaxed max-w-[360px]">
            {t("description")}
          </h5>
        </div>

        <Suspense fallback={<SignInLoading />}>
          <SignInForm />
        </Suspense>

        <div className="text-center">
          <p className="text-subtitle text-sm">
            {t("dontHaveAccount")}{" "}
            <Link
              href="/auth/sign-up"
              className="text-primary underline font-medium"
            >
              {t("signUp")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
