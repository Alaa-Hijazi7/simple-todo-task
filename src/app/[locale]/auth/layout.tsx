import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 h-screen">
      <aside className="hidden lg:flex flex-col justify-between bg-primary col-span-1 px-4">
        <Image
          src="/logo.svg"
          alt="logo"
          width={280}
          height={85}
          className="mx-auto my-auto mt-[100px]"
        />
        <Image
          src="/auth-sidebar-assets-1.svg"
          alt="auth-sidebar-assets-1"
          width={424}
          height={150}
          className="mx-auto my-auto mt-[100px]"
        />
        <Image
          src="/auth-sidebar-assets-2.svg"
          alt="auth-sidebar-assets-2"
          width={424}
          height={150}
          className="mx-auto my-auto mt-[100px]"
        />
      </aside>

      <section className="flex flex-col justify-center items-center relative w-full h-full col-span-2">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="flex-1 flex justify-center items-center w-full">
          {children}
        </div>
        <footer className="w-full absolute bottom-4 left-0 flex justify-end px-6 py-10">
          <p
            dir="ltr"
            className="rubik-wet-paint text-primary text-sm hover:underline cursor-pointer"
          >
            @ IZTECH VALLY
          </p>
        </footer>
      </section>
    </main>
  );
}
