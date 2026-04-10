import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] text-[var(--text-primary)]">
      <div className="inline-flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-5 py-3 text-sm font-semibold">
        <LoadingSpinner size="md" className="text-[var(--gold)]" />
        <span>Loading REVA...</span>
      </div>
    </div>
  );
}
