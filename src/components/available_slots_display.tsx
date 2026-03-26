import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PremiumSlots from "./slots_grid";
import Spinner from "./ui/spinner";

export default function AvailableSlots({ date }: { date: string }) {

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["slots", date],
        queryFn: async () => {
            const res = await axios.get(`/api/v1/user/slots?date=${date}`);
            return res.data;
        },
        enabled: !!date,
    });

    if (isLoading) {
        return (
            <div className="w-full h-[300px] flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            {isFetching && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
                    <Spinner />
                </div>
            )}
            {
                !data || data.length === 0 ?
                    (
                        <div className="w-full h-[300px] flex flex-col items-center justify-center text-slate-500">
                            <p className="text-lg font-medium">No slots available</p>
                            <p className="text-sm">Try selecting another date</p>
                        </div>
                    ) :
                    <PremiumSlots
                        slots={data}
                        onSelect={(slot) => {
                            console.log("Booking slot:", slot.id);
                        }}
                    />
            }
        </div>
    );
}