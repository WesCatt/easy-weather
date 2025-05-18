import api from "@/utils/request";
import {NextResponse} from "next/server";

export const GET = async (req) => {
    try {
        const searchParams = new URL(req.url).searchParams;
        const range = searchParams.get("range");
        const response = await api.get(`/geo/v2/city/top?number=10&range=${range || "cn"}`);
        return NextResponse.json(response.data);
    } catch (e) {
        return NextResponse.json(e, {status: 500});
    }
}
