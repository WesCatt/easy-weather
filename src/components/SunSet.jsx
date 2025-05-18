import Card from "@/components/Card";
import {useWeather} from "@/context/WeatherContext";
import {SiSunrise} from "react-icons/si";
import {useMemo} from "react";
import {getHour, getSkyPhase} from "@/utils/tool";
import {TbSunset2} from "react-icons/tb";
import {Skeleton} from "@/components/ui/skeleton";

const SunSet = () => {
    const {todayWeather, currentCity} = useWeather();
    const result = useMemo(() => {
        if (!currentCity) return "sun";
        return getSkyPhase(
            new Date(),
            "05:42",
            "18:32",
            "20:10",
            "06:10",
            currentCity?.tz,
        );
    }, [currentCity])
    return (
        <Card
            className=" lg:col-span-2 lg:col-start-9 lg:row-start-1 md:col-start-1 md:row-start-13 col-span-6  row-span-2 ">
            <div className="flex gap-2 items-center text-[12px]">
                <TbSunset2/>
                <span>{result === "sun" ? "日落" : "月落"}</span>
            </div>
            <div
                className="text-[20px] mb-20">{todayWeather ? getHour(result === "sun" ? todayWeather?.[0].sunset : todayWeather?.[0].moonset, currentCity?.tz) :
                <Skeleton className="w-[100px] h-[10px]"/>}</div>
            <div className="text-[12px] text-zinc-500 flex items-center gap-3">
                <span className="flex items-center gap-1"><SiSunrise/>{result === "sun" ? "日出" : "月出"}:</span>
                <span>{todayWeather ? getHour(result === "sun" ? todayWeather[0].sunrise : todayWeather[0].moonrise, currentCity?.tz) :
                    <Skeleton className="w-[100px] h-[10px]"/>}</span>
            </div>
        </Card>
    )
}

export default SunSet;