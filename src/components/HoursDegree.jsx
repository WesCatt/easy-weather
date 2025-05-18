import Card from "@/components/Card";
import {useEffect, useState} from "react";
import api from "@/utils/request";
import {useWeather} from "@/context/WeatherContext";
import {Skeleton} from "@/components/ui/skeleton";
import {getHour} from "@/utils/tool";
import {TbTemperatureSun} from "react-icons/tb";

const HoursDegree = () => {
    const {currentCity} = useWeather();
    const [hourWeather, setHourWeather] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!currentCity) return;
        setLoading(true);
        api.get(`/v7/weather/24h?location=${currentCity.id}`).then(res => {
            setHourWeather(res.data.hourly);
        }).catch(res => {
        }).finally(() => {
            setLoading(false);
        })
    }, [currentCity]);
    return (
        <Card
            className="col-span-12 justify-start lg:col-span-4 col-span-12 md:col-start-7 lg:row-start-3 lg:col-start-5 row-span-2">
            {loading ? <>
                <Skeleton className="w-full h-full"/>
            </> : <>
                <div className="flex items-center text-[12px] gap-2">
                    <span><TbTemperatureSun/></span><span>未来几小时温度</span>
                </div>
                <div className="flex justify-between items-center w-full h-full">
                    {
                        hourWeather.slice(0,6).map((v, i) => (
                                <div key={i}
                                     className="text-center pt-4  flex w-full h-full justify-between  flex-col gap-2">
                                <span
                                    className="text-[14px] text-zinc-500">{getHour(v.fxTime, currentCity?.tz, false)}</span>
                                    <span className="text-[20px]"><i className={`qi-${v.icon}`}></i></span>
                                    <span className="text-[12px]">{v.temp}°</span>
                                </div>

                        ))
                    }
                </div>
            </>}
        </Card>

    )
}

export default HoursDegree;