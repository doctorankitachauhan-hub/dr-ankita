import { Patient } from "@/types/patient";
import { CalendarIcon, PhoneIcon } from "lucide-react";
import React from "react";

interface PatientGridProps {
    patients: Patient[];
    isLoading: boolean;
    onViewPatient: (patient: Patient) => void;
}

export function PatientGrid({
    patients,
    isLoading,
    onViewPatient,
}: PatientGridProps) {
    const gridStyle: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 14,
    };

    if (isLoading) {
        return <PatientGridSkeleton count={6} />;
    }

    if (patients.length === 0) {
        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "3rem 0",
                    color: "var(--color-text-secondary)",
                    fontSize: 14,
                }}
            >
                No patients found.
            </div>
        );
    }

    return (
        <div style={gridStyle}>
            {patients.map((patient) => (
                <PatientCard
                    key={patient.id}
                    patient={patient}
                    onView={() => onViewPatient(patient)}
                />
            ))}
        </div>
    );
}


function isUpcoming(iso: string): boolean {
    return new Date(iso) > new Date();
}

interface PatientCardProps {
    patient: Patient;
    onView: () => void;
}

export function PatientCard({ patient, onView }: PatientCardProps) {
    const upcoming = patient.appointments.filter((a) =>
        isUpcoming(a.slot.startTime)
    );
    const past = patient.appointments.filter(
        (a) => !isUpcoming(a.slot.startTime)
    );

    return (
        <div
            style={{
                background: "var(--color-background-primary, #fff)",
                border: "0.5px solid var(--color-border-tertiary, #e5e7eb)",
                borderRadius: 14,
                padding: "1.125rem 1.25rem",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) =>
            ((e.currentTarget as HTMLDivElement).style.borderColor =
                "var(--color-border-secondary, #d1d5db)")
            }
            onMouseLeave={(e) =>
            ((e.currentTarget as HTMLDivElement).style.borderColor =
                "var(--color-border-tertiary, #e5e7eb)")
            }
        >
            {/* Avatar + name */}
            <div
                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}
            >
                <PatientAvatar name={patient.name} />
                <div style={{ minWidth: 0 }}>
                    <div
                        style={{
                            fontWeight: 500,
                            fontSize: 15,
                            color: "var(--color-text-primary)",
                        }}
                    >
                        {patient.name}
                    </div>
                    <div
                        style={{
                            fontSize: 12,
                            color: "var(--color-text-secondary)",
                            marginTop: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {patient.email}
                    </div>
                </div>
            </div>

            <hr
                style={{
                    border: "none",
                    borderTop: "0.5px solid var(--color-border-tertiary, #e5e7eb)",
                    marginBottom: 12,
                }}
            />

            {/* Meta */}
            <div
                style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 13,
                        color: "var(--color-text-secondary)",
                    }}
                >
                    <PhoneIcon size={12} strokeWidth={1} />
                    <span
                        style={{ color: "var(--color-text-primary)", fontWeight: 500 }}
                    >
                        {patient.phone}
                    </span>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 13,
                        color: "var(--color-text-secondary)",
                    }}
                >
                    <CalendarIcon size={12} strokeWidth={1} />
                    <span>
                        <span
                            style={{ color: "var(--color-text-primary)", fontWeight: 500 }}
                        >
                            {patient.appointments.length}
                        </span>{" "}
                        appointment{patient.appointments.length !== 1 ? "s" : ""}
                    </span>
                </div>
            </div>

            {/* Pills */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                {upcoming.length > 0 && (
                    <span
                        style={{
                            fontSize: 11,
                            fontWeight: 500,
                            padding: "3px 9px",
                            borderRadius: 20,
                            background: "var(--color-background-warning, #fffbeb)",
                            color: "var(--color-text-warning, #92400e)",
                            border: "0.5px solid var(--color-border-warning, #fde68a)",
                        }}
                    >
                        {upcoming.length} upcoming
                    </span>
                )}
                {past.length > 0 && (
                    <span
                        style={{
                            fontSize: 11,
                            fontWeight: 500,
                            padding: "3px 9px",
                            borderRadius: 20,
                            background: "var(--color-background-success, #f0fdf4)",
                            color: "var(--color-text-success, #166534)",
                            border: "0.5px solid var(--color-border-success, #bbf7d0)",
                        }}
                    >
                        {past.length} past
                    </span>
                )}
                {patient.appointments.slice(0, 2).map((a) => (
                    <span
                        key={a.id}
                        style={{
                            fontSize: 11,
                            padding: "3px 9px",
                            borderRadius: 20,
                            background: isUpcoming(a.slot.startTime)
                                ? "var(--color-background-warning, #fffbeb)"
                                : "var(--color-background-secondary, #f9fafb)",
                            color: isUpcoming(a.slot.startTime)
                                ? "var(--color-text-warning, #92400e)"
                                : "var(--color-text-secondary)",
                            border: "0.5px solid var(--color-border-tertiary, #e5e7eb)",
                        }}
                    >
                        {new Date(a.slot.startTime).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                        })}
                    </span>
                ))}
            </div>

            {/* CTA */}
            <button
                onClick={onView}
                style={{
                    marginTop: "auto",
                    width: "100%",
                    padding: "8px 0",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--color-text-primary)",
                    background: "var(--color-background-secondary, #f9fafb)",
                    border: "0.5px solid var(--color-border-secondary, #d1d5db)",
                    borderRadius: 8,
                    cursor: "pointer",
                    transition: "background 0.12s",
                }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                    "var(--color-background-tertiary, #f3f4f6)")
                }
                onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                    "var(--color-background-secondary, #f9fafb)")
                }
            >
                View full details
            </button>
        </div>
    );
}

export function getInitials(name: string): string {
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

interface PatientAvatarProps {
    name: string;
    size?: number;
    fontSize?: number;
}

export function PatientAvatar({ name, size = 46, fontSize = 15 }: PatientAvatarProps) {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                background: "var(--color-background-info, #eff6ff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 500,
                fontSize,
                color: "var(--color-text-info, #1d4ed8)",
                flexShrink: 0,
            }}
        >
            {getInitials(name)}
        </div>
    );
}

const shimmerStyle: React.CSSProperties = {
    background:
        "linear-gradient(90deg, var(--color-background-secondary, #f3f4f6) 25%, var(--color-background-tertiary, #e5e7eb) 50%, var(--color-background-secondary, #f3f4f6) 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.6s infinite",
    borderRadius: 6,
};

if (typeof document !== "undefined") {
    const id = "__skeleton_kf__";
    if (!document.getElementById(id)) {
        const style = document.createElement("style");
        style.id = id;
        style.textContent = `
      @keyframes shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `;
        document.head.appendChild(style);
    }
}

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    style?: React.CSSProperties;
}

function Skeleton({ width = "100%", height = 14, borderRadius = 6, style }: SkeletonProps) {
    return (
        <div
            style={{
                width,
                height,
                borderRadius,
                flexShrink: 0,
                ...shimmerStyle,
                ...style,
            }}
        />
    );
}

/* ─── Patient card skeleton ─── */
export function PatientCardSkeleton() {
    return (
        <div
            style={{
                background: "var(--color-background-primary, #fff)",
                border: "0.5px solid var(--color-border-tertiary, #e5e7eb)",
                borderRadius: 14,
                padding: "1.125rem 1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: 0,
            }}
        >
            {/* Avatar + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <Skeleton width={46} height={46} borderRadius="50%" />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                    <Skeleton width="55%" height={14} />
                    <Skeleton width="80%" height={11} />
                </div>
            </div>

            <div style={{ borderTop: "0.5px solid var(--color-border-tertiary, #e5e7eb)", marginBottom: 12 }} />

            {/* Meta rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <Skeleton width={14} height={14} borderRadius={4} />
                    <Skeleton width="45%" height={12} />
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <Skeleton width={14} height={14} borderRadius={4} />
                    <Skeleton width="35%" height={12} />
                </div>
            </div>

            {/* Pills */}
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                <Skeleton width={72} height={22} borderRadius={20} />
                <Skeleton width={60} height={22} borderRadius={20} />
            </div>

            {/* Button */}
            <Skeleton width="100%" height={34} borderRadius={8} />
        </div>
    );
}

/* ─── Grid of skeletons ─── */
export function PatientGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 14,
            }}
        >
            {Array.from({ length: count }).map((_, i) => (
                <PatientCardSkeleton key={i} />
            ))}
        </div>
    );
}