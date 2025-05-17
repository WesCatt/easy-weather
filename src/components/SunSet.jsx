import Card from "@/components/Card";
import {useWeather} from "@/context/WeatherContext";
import {SiSunrise} from "react-icons/si";
import {useMemo} from "react";
import {getHour} from "@/utils/tool";
import {TbSunset2} from "react-icons/tb";

const SunSet = () => {
    const {todayWeather,currentCity} = useWeather();
    return (
        <Card
            className=" lg:col-span-2 lg:col-start-9 lg:row-start-1 md:col-start-1 md:row-start-13 col-span-6  row-span-2 ">
            <div className="flex gap-2 items-center text-[12px]">
                <TbSunset2 />
                <span>日落</span>
            </div>
            <div className="text-[20px] mb-20">{getHour(todayWeather?.[0].sunset,currentCity?.tz)}</div>
            <div className="text-[12px] text-zinc-500 flex items-center gap-3">
                <span className="flex items-center gap-1"><SiSunrise/>日出:</span>
                <span>{getHour(todayWeather?.[0].sunrise,currentCity?.tz)}</span>
            </div>
        </Card>
    )
}

export default SunSet;