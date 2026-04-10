"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type LoadingLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  spinnerClassName?: string;
  minPendingMs?: number;
};

export function LoadingLink({
  href,
  className = "",
  children,
  spinnerClassName = "",
  minPendingMs = 350,
}: LoadingLinkProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);
    await new Promise((resolve) => {
      window.setTimeout(resolve, minPendingMs);
    });
    router.push(href);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      disabled={loading}
    >
      <span className="inline-flex items-center justify-center gap-2">
        <span className={loading ? "opacity-100" : "opacity-0"}>
          <LoadingSpinner className={spinnerClassName} />
        </span>
        <span>{children}</span>
      </span>
    </button>
  );
}
