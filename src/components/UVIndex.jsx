import Card from "@/components/Card";
import {TbUvIndex} from "react-icons/tb";
import Bar from "@/components/ui/Bar";
import {useWeather} from "@/context/WeatherContext";
import {useEffect, useState} from "react";
import api from "@/utils/request";
import {Skeleton} from "@/components/ui/skeleton";

const UVIndex = () => {
    const {currentCity} = useWeather();
    const [uvIndex, setUvIndex] = useState(null);
    useEffect(() => {
        if (!currentCity) return;
        api.get(`/v7/indices/1d?type=1&location=${currentCity.id}`).then(res => {
            setUvIndex(res.data.daily[0]);
        })
    }, [currentCity]);
    return (
        <Card
            className="relative col-span-6 lg:col-span-2 md:col-span-6 md:col-start-1 md:row-start-15 lg:col-start-11 lg:row-start-3  col-span-6 row-span-2">
            <div className="flex items-center gap-2 text-[12px]">
                <TbUvIndex/>
                <span>紫外线强度</span>
            </div>
            <div className="flex flex-col gap-1">
                <span>{uvIndex?uvIndex.level:<Skeleton className="w-[100px] h-[20px]"/>}</span>
                <span>{uvIndex?uvIndex.category:<Skeleton className="w-[100px] h-[20px]"/>}</span>
            </div>
            <Bar value={uvIndex?.level} maxValue={5}/>
            <div className="text-[12px] text-zinc-500">{uvIndex?.text ? uvIndex.text : "无额外描述"}</div>
        </Card>
    )
}
export default UVIndex;