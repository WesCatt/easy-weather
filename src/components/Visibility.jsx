import Card from "@/components/Card";
import {useWeather} from "@/context/WeatherContext";
import {MdVisibility} from "react-icons/md";

const getVisibilitySuggestion = (vis) => {
    if (vis >= 10) return "视野清晰，适合外出活动和驾驶。";
    if (vis >= 5) return "可见度良好，出行基本无碍。";
    if (vis >= 2) return "轻微雾霾，驾车请注意观察周围环境。";
    if (vis >= 1) return "雾气明显，建议减速慢行。";
    if (vis >= 0.5) return "浓雾，能见度差，请减少外出并开启雾灯。";
    return "极度低能见度，建议避免外出。";
}
const Visibility = () => {
    const {nowWeather} = useWeather();
    return (
        <Card
            className="col-span-12 lg:col-span-2 row-span-2 lg:col-start-9  lg:row-start-5  md:row-start-9 md:col-start-7">
            <div className="text-[12px] flex items-center gap-2">
                <MdVisibility/>
                <span>可见度</span>
            </div>
            <div className="mb-15 text-[20px]  font-[800]">
                {nowWeather?.vis} KM
            </div>
            <div className="text-zinc-500 text-[12px]">{getVisibilitySuggestion(nowWeather?.vis)}</div>
        </Card>
    )
}

export default Visibility;