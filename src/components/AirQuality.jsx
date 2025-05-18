import Card from "@/components/Card";
import {useEffect, useState} from "react";
import {useWeather} from "@/context/WeatherContext";
import api from "@/utils/request";
import {Skeleton} from "@/components/ui/skeleton";
import {AQI_MAX_VALUES} from "@/lib/AQI_VALUE";
import Bar from "@/components/ui/Bar";

const AirQuality = () => {
    const {currentCity} = useWeather();
    const [airQuality, setAirQuality] = useState(null);
    useEffect(() => {
        if (!currentCity) return;
        setAirQuality(null);
        api.get(`/airquality/v1/current/${currentCity.lat}/${currentCity.lon}`).then(res => {
            setAirQuality(res.data.indexes[0]);
        })

    }, [currentCity]);
    return (
        <Card className="lg:col-span-4 col-span-12 md:col-start-7 lg:row-start-1 lg:col-start-5 row-span-2 col-span-12">
            <div className="flex gap-2 text-[12px]">
                <i className="qi-2202"></i>
                <span>空气污染</span>
            </div>
            <Bar value={airQuality?.aqi} maxValue={AQI_MAX_VALUES[airQuality?.code]}/>
            <div className="text-[12px] text-zinc-500 flex items-center flex-col items-start gap-3">
                <span className="flex items-center gap-2">正常人群：{airQuality ? airQuality.health.advice.generalPopulation :
                    <Skeleton className="min-w-[100px] h-[10px]"/>}</span>
                <span className="flex items-center gap-2">敏感人群：{airQuality ? airQuality.health.advice.sensitivePopulation :
                    <Skeleton className="min-w-[100px] h-[10px]"/>}</span>
            </div>
        </Card>

    )
}
export default AirQuality;