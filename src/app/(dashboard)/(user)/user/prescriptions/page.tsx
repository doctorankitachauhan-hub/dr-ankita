'use client';

import PrescriptionPreview from "@/components/preview_prescriptions";
import { PrescriptionsInterface } from "@/types/prescription";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FileText } from "lucide-react";

export default function ViewPrescriptions() {

    const { data, isFetching, error, isLoading } = useQuery<PrescriptionsInterface[] | []>({
        queryKey: ['prescriptions'],
        queryFn: async () => {
            const res = await axios.get("/api/v1/user/prescriptions")
            return res.data
        }
    })


    if (isLoading || isFetching) {
        return (
            <div className="p-5">
                <PrescriptionSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-3xl mx-auto p-5 text-center text-red-500">
                Failed to load prescriptions.
            </div>
        );
    }
    if (!data || data.length === 0) {
        return (
            <div className="max-w-3xl mx-auto p-10 text-center">
                <div className="flex flex-col items-center gap-3 text-gray-400">
                    <FileText size={32} className="opacity-30" />
                    <p className="text-sm">No prescriptions found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-5 space-y-6">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-gray-900">
                        Prescriptions
                    </h1>
                    <p className="text-sm text-gray-500">
                        View all your prescriptions
                    </p>
                </div>

                <div className="text-xs bg-primary-color/10 text-primary-color px-3 py-1 rounded-full font-medium">
                    {data.length} Total
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
                <PrescriptionPreview data={data} />
            </div>
        </div>
    )
}

function SkeletonBlock({ className }: { className: string }) {
    return (
        <div
            className={`relative overflow-hidden rounded-lg bg-gray-200 ${className}`}
        >
            <div className="absolute inset-0 animate-[shimmer_1.6s_linear_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent bg-[length:200%_100%]" />
        </div>
    );
}

function PrescriptionSkeleton() {
    return (
        <div className="space-y-4">
            <SkeletonBlock className="h-3 w-32" />

            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white"
                >
                    <div className="flex items-center gap-3">
                        <SkeletonBlock className="w-9 h-9 rounded-lg" />
                        <div className="flex-1 space-y-2">
                            <SkeletonBlock className="h-3 w-32" />
                            <SkeletonBlock className="h-3 w-20" />
                        </div>
                    </div>

                    <SkeletonBlock className="h-3 w-full" />
                    <SkeletonBlock className="h-3 w-4/5" />
                    <SkeletonBlock className="h-3 w-2/3" />

                    <SkeletonBlock className="h-8 w-24 rounded-lg" />
                </div>
            ))}
        </div>
    );
}
