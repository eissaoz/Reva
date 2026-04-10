"use client";

type ToastProps = {
  message: string;
  open: boolean;
};

export function Toast({ message, open }: ToastProps) {
  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] px-4 py-3 text-sm text-[var(--text-primary)] shadow-lg">
      {message}
    </div>
  );
}
