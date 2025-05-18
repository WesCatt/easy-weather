import Card from "@/components/Card";
import {useWeather} from "@/context/WeatherContext";
import {TbTemperature} from "react-icons/tb";
import {Skeleton} from "@/components/ui/skeleton";

function getFeelsLikeSuggestion(temp) {
    if (temp < 0) return "极寒天气，请注意防寒保暖";
    if (temp < 10) return "寒冷天气，请穿棉服或羽绒服";
    if (temp < 20) return "稍凉，建议穿外套";
    if (temp < 28) return "体感舒适，适宜外出";
    if (temp < 33) return "略热，建议清凉穿着，注意补水";
    if (temp < 37) return "闷热，减少户外活动";
    return "酷热难耐，注意防暑中暑，避免暴晒";
}

const FeelDegree = () => {
    const {nowWeather} = useWeather();
    return (
        <Card className="col-span-12 lg:col-span-2 row-span-2 lg:col-start-5 lg:row-start-5  md:row-start-5  ">
            <div className="flex items-center gap-2 text-[12px]">
                <TbTemperature/>
                <span>体感温度</span>
            </div>
            <div className="text-[20px] mb-15  font-[800]">
                {nowWeather?nowWeather.feelsLike+"°":<Skeleton className="w-[50px] h-[50px]"/>}
            </div>
            <div className="text-[12px] text-zinc-500">{getFeelsLikeSuggestion(nowWeather?.feelsLike * 1)}</div>
        </Card>
    )
}

export default FeelDegree;