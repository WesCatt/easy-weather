"use client"
import {Skeleton} from "@/components/ui/skeleton";
import Card from "@/components/Card";
import {weekToday} from "@/utils/tool";
import {useWeather} from "@/context/WeatherContext";
import {useLocalTime} from "@/hooks/useLocalTime";
import {HiOutlinePaperAirplane} from "react-icons/hi2";

export const TodayWeather = ({weather}) => {
    const {currentCity, nowWeather,todayWeather} = useWeather();
    const {time} = useLocalTime(currentCity?.tz);
    return (
        <Card className={"lg:col-span-4 md:col-span-6 row-span-4 col-span-12"}>
            {
                weather ? <>
                    <div className="gap-2 h-full flex flex-col text-[12px]  justify-between">
                        <div className="flex items-center justify-between">
                            <span>{weekToday(currentCity?.tz)}</span>
                            <span>{time}</span>
                        </div>
                        <span className="relative">
                            <span className="relative">{currentCity.country} {currentCity.name} <HiOutlinePaperAirplane
                                className="absolute top-[-2px] -rotate-45 right-[-20px] z-[2]"/></span>
                        </span>
                        <div className="text-[100px]  flex items-center justify-center h-full">
                            {
                                nowWeather.temp+"°"
                            }
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            {
                                nowWeather.icon ? <i className={`qi-${nowWeather.icon} text-[20px]`}></i> :
                                    <i className={"size-12 qi-151 text-[20px]"}></i>
                            }
                            <span>{nowWeather.text}</span>
                            <div className="flex items-center gap-4 text-zinc-500">
                                <span>最低温度: {todayWeather?.[0]?.tempMin}°</span>
                                <span>最高温度: {todayWeather?.[0]?.tempMax}°</span>
                            </div>
                        </div>
                    </div>

                </> : <Skeleton className="h-full w-full"/>
            }
        </Card>
    )
}