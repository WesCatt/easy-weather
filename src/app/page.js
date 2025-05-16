'use client'
import {currentCity} from "@/utils/tool";
import {useRouter} from "next/navigation";

export default function Home() {
    // 在这里获取当前城市跳转到相应城市。
    const location = currentCity()||"北京";
    const router=useRouter();
    router.push(`/${location}`);
    return (
        <>

        </>
    );
}
