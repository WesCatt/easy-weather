import Card from "@/components/Card";
import {useWeather} from "@/context/WeatherContext";
import {WiHumidity} from "react-icons/wi";

function getHumiditySuggestion(humidity) {
    if (humidity <= 30) {
        return "湿度过低，空气干燥，注意补水，适当使用加湿器。";
    }
    if (humidity <= 60) {
        return "湿度适中，体感舒适。";
    }
    if (humidity <= 80) {
        return "湿度偏高，感觉闷热，适当除湿。";
    }
    return "湿度过高，注意防霉防潮，必要时开启除湿设备。";
}

const Humidity = () => {
    const {nowWeather} = useWeather();
    return (
        <Card
            className="col-span-12 lg:col-span-2 row-span-2 lg:col-start-7   lg:row-start-5 md:row-start-7 md:col-start-7 ">
            <div className='text-[12px] flex items-center gap-2'>
                <WiHumidity/>
                <span>湿度</span>
            </div>
            <div className="text-[20px] mb-15  font-[800]">
                {nowWeather?.humidity} °
            </div>
            <div className="text-zinc-500 text-[12px]">{getHumiditySuggestion(nowWeather?.humidity)}</div>
        </Card>
    )
}

export default Humidity;