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

    if (isLoading || isFetching) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (!data?.length) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                No slots available for this day
            </div>
        );
    }

    return (
        <PremiumSlots
            slots={data}
            onSelect={(slot) => {
                console.log("Booking slot:", slot.id);
            }}
        />
    );
}