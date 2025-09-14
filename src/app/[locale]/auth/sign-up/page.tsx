import { Suspense } from "react";
import { SignUpForm } from "@/components/auth/signup-form";
import { SignUpLoading } from "@/components/auth/signup-loading";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function SignUpPage() {
  const t = await getTranslations("auth.signUp");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            {t("description")}
          </p>
        </div>

        <Suspense fallback={<SignUpLoading />}>
          <SignUpForm />
        </Suspense>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            {t("alreadyHaveAccount")}{" "}
            <Link
              href="/auth/login"
              className="text-red-600 hover:text-red-700 underline font-medium"
            >
              {t("signIn")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
