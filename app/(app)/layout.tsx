"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AppShell from "@/components/app/AppShell";
import { useAldea } from "@/context/AldeaContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { onboarded } = useAldea();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!onboarded && pathname !== "/onboarding") {
      router.replace("/onboarding");
    }
  }, [onboarded, pathname, router]);

  return <AppShell>{children}</AppShell>;
}
