import Card from "@/components/Card";
import {useWeather} from "@/context/WeatherContext";
import {AiOutlineDashboard} from "react-icons/ai";
import {Skeleton} from "@/components/ui/skeleton";

function getPressureAdvice(pressure) {
    if (pressure >= 1020) return "气压较高，天气通常晴朗稳定，适合外出。";
    if (pressure >= 1010) return "气压正常，身体感觉舒适。";
    if (pressure >= 1000) return "气压略低，部分人可能感觉轻微不适。";
    if (pressure >= 990) return "气压偏低，容易引起头痛、疲倦等症状，注意休息。";
    if (pressure >= 980) return "气压较低，可能伴随阴雨天气，注意保暖与情绪调节。";
    return "气压极低，可能是恶劣天气前兆，建议减少外出并关注天气预报。";
}

const Pressure = () => {
    const {nowWeather} = useWeather();

    return (
        <Card
            className="col-span-12 lg:col-span-2 row-span-2 lg:col-start-11 lg:row-start-5 md:row-start-7 md:row-start-11  md:col-start-7">
            <div className="text-[12px] flex items-center gap-2">
                <AiOutlineDashboard/>
                <span>压强</span>
            </div>
            <div className="mb-15 text-[20px] font-[800]">
                {nowWeather ? nowWeather.pressure + " hPa" : <Skeleton className="w-[50px] h-[50px]"/>}
            </div>
            <div className='text-[12px] text-zinc-500'>
                {getPressureAdvice(nowWeather?.pressure)}
            </div>
        </Card>
    )
}

export default Pressure;