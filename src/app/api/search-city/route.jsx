import api from "@/utils/request";
import {NextResponse} from "next/server";

export const GET = async (req) => {
    const searchParams = new URL(req.url).searchParams;
    const location = searchParams.get("location");
    const res = await api.get(`/geo/v2/city/lookup?location=${location}`)
    return NextResponse.json(res.data);

}