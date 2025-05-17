import {useWeather} from "@/context/WeatherContext";
import {Button} from "@/components/ui/button";

const TopCity = ({onClick}) => {
    const {hotCity} = useWeather();
    return (
        <div
            className="col-span-12 md:col-span-10 lg:col-span-2  lg:row-span-6 row-span-20 lg:col-start-11 md:col-start-9 lg:row-start-7 p-2 justify-between  flex flex-col gap-2">
            <h1>热门城市</h1>
            {
                hotCity?.map(city => (
                    <Button  className="cursor-pointer font-[600]" onClick={() => onClick(city.id)}
                                 key={city.id}>{city.adm1} {city.name} </Button>
                ))
            }
        </div>
    )
}

export default TopCity;