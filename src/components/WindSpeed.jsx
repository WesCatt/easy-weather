import Card from "@/components/Card";
import Compass from "@/components/ui/Compass"
import {useWeather} from "@/context/WeatherContext";

const WindSpeed = () => {
    const {nowWeather} = useWeather();
    return (
        <Card
            className="col-span-6 lg:col-span-2  lg:col-start-9 lg:row-start-3 md:row-start-13 md:col-span-12  row-span-2  ">
            <div className="flex items-center gap-2 text-[12px]">
                <span><i className={`qi-${nowWeather?.icon}`}></i></span><span>风向</span>
            </div>
            <div className="w-full h-full flex items-center justify-center">
                <Compass deg={nowWeather?.wind360} speed={nowWeather?.windSpeed}/>
            </div>
        </Card>
    )
}
export default WindSpeed;