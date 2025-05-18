import Card from "@/components/Card";
import {MdOutlineDateRange} from "react-icons/md";
import {useWeather} from "@/context/WeatherContext";
import {getWeekDay} from "@/utils/tool";
import {Skeleton} from "@/components/ui/skeleton";

const FutureWeather = () => {
    const {todayWeather, currentCity} = useWeather();
    return (
        <Card className="col-span-12 justify-start lg:col-span-4 row-span-8 row-start-5 md:col-span-6 col-start-1">
            <div className="flex items-center gap-2 text-[12px]">
                <MdOutlineDateRange/>
                <span>未来10天预报</span>
            </div>
            <div className="flex flex-col  h-full mt-5 justify-between">
                {
                    todayWeather ? todayWeather.map((weather, i, arr) => (
                        <div key={i}
                             className={`py-2 flex items-center w-full ${i === 0 && "border-b"} ${i !== 0 && i !== arr.length - 1 && "border-b"} justify-between`}>
                            <span>{i === 0 ? "今天" : getWeekDay(weather.fxDate, currentCity?.tz)}</span>
                            <span className="flex items-center mr-5 ml-auto gap-2">
                                <span className="flex flex-col gap-1">
                                <i className={`qi-${weather.iconDay}`}></i>
                                    <span className="text-[10px] text-zinc-500">白天</span>
                                </span>
                                <span className="flex flex-col gap-1">
                                <i className={`qi-${weather.iconNight}`}></i>
                                    <span className="text-[10px] text-zinc-500">晚上</span>
                                </span>
                            </span>
                            <div className="flex items-center justify-between text-[12px] gap-2">
                                <span className="text-zinc-500">{weather.tempMin} °</span>
                                <div
                                    className="h-[5px] max-w-[150px] bg-linear-to-r from-teal-400 rounded-full to-orange-400 w-[150px]"></div>
                                <span>{weather.tempMax} °</span>
                            </div>
                        </div>
                    )) : <>
                        {
                            Array.from({length: 10}).map((_, i,arr) => (
                                <div key={i}
                                     className={`py-2 flex items-center w-full ${i === 0 && "border-b"} ${i !== 0 && i !== arr.length - 1 && "border-b"} justify-between`}>
                                    <span><Skeleton className="w-[50px] h-[10px]"/></span>
                                    <span className="flex items-center mr-5 ml-auto gap-2">
                                <span className="flex flex-col gap-1">
                                <i className={`qi-100`}></i>
                                    <span className="text-[10px] text-zinc-500">白天</span>
                                </span>
                                <span className="flex flex-col gap-1">
                                <i className={`qi-101`}></i>
                                    <span className="text-[10px] text-zinc-500">晚上</span>
                                </span>
                            </span>
                                    <div className="flex items-center justify-between text-[12px] gap-2">
                                        <span className="text-zinc-500"><Skeleton className="w-[50px] h-[10px]"/></span>
                                        <div
                                            className="h-[5px] max-w-[150px] bg-linear-to-r from-teal-400 rounded-full to-orange-400 w-[150px]"></div>
                                        <span><Skeleton className="w-[50px] h-[10px]"/></span>
                                    </div>
                                </div>
                            ))
                        }
                    </>
                }
            </div>
        </Card>
    )
}
export default FutureWeather;