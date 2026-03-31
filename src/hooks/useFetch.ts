import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useSlots() {
    return useQuery({
        queryKey: ["slots"],
        queryFn: async () => {
            const res = await axios.get("/api/v1/doctor/slots?date=2026-03-24");
            return res.data;
        }
    });
}