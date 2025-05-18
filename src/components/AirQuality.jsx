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
            {
                airQuality ? <>
                    <div className="flex gap-2 text-[12px]">
                        <i className="qi-2202"></i>
                        <span>空气污染</span>
                    </div>
                        <Bar value={airQuality.aqi} maxValue={AQI_MAX_VALUES[airQuality.code]}/>
                    <div className="text-[12px] text-zinc-500 flex items-center flex-col items-start gap-3">
                        <span>正常人群：{airQuality?.health?.advice?.generalPopulation}</span>
                        <span>敏感人群：{airQuality?.health?.advice?.sensitivePopulation}</span>
                    </div>
                </> : <Skeleton className="w-full h-full"/>
            }
        </Card>

    )
}
export default AirQuality;