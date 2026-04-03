import React from "react";

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "1rem 1.25rem",
        background: "var(--color-background-danger, #fef2f2)",
        border: "0.5px solid var(--color-border-danger, #fecaca)",
        borderRadius: 10,
        fontSize: 13,
        color: "var(--color-text-danger, #991b1b)",
      }}
    >
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            fontSize: 12,
            fontWeight: 500,
            padding: "4px 12px",
            borderRadius: 6,
            border: "0.5px solid var(--color-border-danger, #fecaca)",
            background: "transparent",
            color: "var(--color-text-danger, #991b1b)",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}