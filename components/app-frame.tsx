"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";

type AppFrameProps = {
  children: React.ReactNode;
};

export function AppFrame({ children }: AppFrameProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="page-shell">
        <div className="h-28 border-b border-line bg-white" />
        <main />
      </div>
    );
  }

  return (
    <div className="page-shell">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
