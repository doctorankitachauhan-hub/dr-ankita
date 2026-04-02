import React from "react";

interface DashboardHeaderProps {
    totalCount: number;
    search: string;
    onSearchChange: (value: string) => void;
    isLoading: boolean;
}

export function DashboardHeader({
    totalCount,
    search,
    onSearchChange,
    isLoading,
}: DashboardHeaderProps) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: "1.5rem",
            }}
        >
            <div>
                <h1
                    style={{
                        fontSize: 22,
                        fontWeight: 500,
                        color: "var(--color-text-primary)",
                        margin: 0,
                    }}
                >
                    Patients
                </h1>
                <p
                    style={{
                        fontSize: 13,
                        color: "var(--color-text-secondary)",
                        margin: "4px 0 0",
                    }}
                >
                    {isLoading
                        ? "Loading..."
                        : `${totalCount} total patient${totalCount !== 1 ? "s" : ""}`}
                </p>
            </div>

            <input
                type="text"
                placeholder="Search by name, email or phone…"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{
                    padding: "8px 12px",
                    fontSize: 13,
                    borderRadius: 8,
                    border: "0.5px solid var(--color-border-secondary, #d1d5db)",
                    background: "var(--color-background-primary, #fff)",
                    color: "var(--color-text-primary)",
                    outline: "none",
                    width: 260,
                }}
            />
        </div>
    );
}