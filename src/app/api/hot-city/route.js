import api from "@/utils/request";
import {NextResponse} from "next/server";

export const GET = async (req) => {
    try {
        const response = await api.get("/geo/v2/city/top?number=10&range=cn");
        return NextResponse.json(response.data);
    } catch (e) {
        console.log(e)
        return NextResponse.json(e, {status: 500});
    }
}
