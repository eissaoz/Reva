type LoadingSpinnerProps = {
  size?: "sm" | "md";
  className?: string;
};

export function LoadingSpinner({ size = "sm", className = "" }: LoadingSpinnerProps) {
  const dimensions = size === "md" ? "h-5 w-5 border-2" : "h-4 w-4 border-2";

  return <span className={`inline-block animate-spin rounded-full border-current border-t-transparent ${dimensions} ${className}`} aria-hidden="true" />;
}
