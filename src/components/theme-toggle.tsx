"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => {
        if (!mounted) return;
        setTheme(isDark ? "light" : "dark");
      }}
      className="h-6 w-11 rounded-full border border-[var(--border-strong)] bg-[var(--bg-inset)] p-1"
    >
      <span
        className={`block h-4 w-4 rounded-full bg-[var(--gold)] transition-transform ${
          isDark ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
