"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";
import PremiumSlots from "./slots_grid";
import Spinner from "./ui/spinner";
import { detectTimeZone, getAllTimeZones, getZoneDisplayLabel } from "@/lib/timezone";

type SelectedSlot = {
    id: string;
    startTime: string;
    endTime: string;
};

export default function AvailableSlots({ date, onSlotConfirm }: { date: string; onSlotConfirm: (slot: SelectedSlot) => void; }) {
    const [timeZone, setTimeZone] = useState<string>(() => detectTimeZone());
    const allZones = useMemo(() => getAllTimeZones(), []);

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["slots", date],
        queryFn: async () => {
            const res = await axios.get(`/api/v1/user/slots?date=${date}`);
            return res.data;
        },
        enabled: !!date,
    });

    function handleZoneInput(value: string) {
        // Only accept it if it matches a real IANA zone (datalist allows free typing)
        const match = allZones.find(
            (z) => z === value || getZoneDisplayLabel(z) === value
        );
        if (match) setTimeZone(match);
    }

    if (isLoading) {
        return (
            <div className="w-full h-[300px] flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            <div className="flex justify-end px-5 pt-4">
                <input
                    list="timezone-options"
                    defaultValue={getZoneDisplayLabel(timeZone)}
                    onChange={(e) => handleZoneInput(e.target.value)}
                    placeholder="Search timezone…"
                    className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-600 outline-none focus:border-primary-color w-56"
                />
                <datalist id="timezone-options">
                    {allZones.map((z) => (
                        <option key={z} value={getZoneDisplayLabel(z)} />
                    ))}
                </datalist>
            </div>

            {isFetching && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
                    <Spinner />
                </div>
            )}
            {!data || data.length === 0 ? (
                <div className="w-full h-[300px] flex flex-col items-center justify-center text-slate-500">
                    <p className="text-lg font-medium">No slots available</p>
                    <p className="text-sm">Try selecting another date</p>
                </div>
            ) : (
                <PremiumSlots
                    slots={data}
                    date={date}
                    timeZone={timeZone}
                    onSlotConfirm={onSlotConfirm}
                />
            )}
        </div>
    );
}