"use client";

import { useMemo, useState } from "react";
import { Patient, PatientsResponse } from "@/types/patient";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DashboardHeader } from "@/components/patient_dashboard_header";
import { ErrorBanner } from "@/components/error";
import { PatientGrid } from "@/components/patient_grid";
import { PatientModal } from "@/components/patient_modal";

export default function PatientDashboard() {
    const [page, setPage] = useState(1);
    const limit = 10;
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [search, setSearch] = useState("");


    const { data, isLoading, isFetching, isError, refetch, error } = useQuery<PatientsResponse>({
        queryKey: ["patient", page, limit],
        queryFn: async () => {
            const res = await axios.get('/api/v1/doctor/patients', {
                params: { page, limit },
                withCredentials: true,
            });
            return res.data;
        },
    })

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        if (!q) return data?.patient;
        return data?.patient.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.email.toLowerCase().includes(q) ||
                p.phone!.includes(q)
        );
    }, [data?.patient, search]);

    return (
        <div style={{ padding: "1.5rem", fontFamily: "var(--font-sans, sans-serif)" }}>
            <DashboardHeader
                totalCount={data?.patient.length ?? 0}
                search={search}
                onSearchChange={setSearch}
                isLoading={isLoading}
            />

            {isError && (
                <div style={{ marginBottom: "1rem" }}>
                    <ErrorBanner
                        message={error?.message ?? "Failed to load patients."}
                        onRetry={() => refetch()}
                    />
                </div>
            )}

            <PatientGrid
                patients={filtered!}
                isLoading={isLoading}
                onViewPatient={setSelectedPatient}
            />

            {selectedPatient && (
                <PatientModal
                    patient={selectedPatient}
                    onClose={() => setSelectedPatient(null)}
                />
            )}
        </div>
    );
}