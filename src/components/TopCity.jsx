import {useWeather} from "@/context/WeatherContext";
import {Skeleton} from "@/components/ui/skeleton";

const TopCity = ({onClick}) => {
    const {hotCity} = useWeather();
    return (
        <div
            className="col-span-12 md:col-span-10 lg:col-span-2  lg:row-span-6 row-span-20 lg:col-start-11 md:col-start-9 lg:row-start-7 pl-2 justify-between  flex flex-col gap-2">
            <h1 className="font-[700]">当前国家-热门城市</h1>
            {
                hotCity?.length ? hotCity.map(city => (
                    <div
                        className="border border-zinc-700/10 dark:border-zinc-700 bg-white dark:bg-black dark:hover:bg-zinc-900 hover:bg-slate-500/10 duration-300 shadow-sm dark:shadow-none w-full py-3 px-2 text-[14px] rounded cursor-pointer "
                        onClick={() => onClick(city.id)}
                        key={city.id}>{city.name} ({city.adm1}) </div>
                )) : <>
                    {
                        Array.from({length: 10}).map((_, i) => (
                            <div
                                className="border border-zinc-700/10 p-0 dark:border-zinc-700 bg-white dark:bg-black dark:hover:bg-zinc-900 hover:bg-slate-500/10 duration-300 shadow-sm dark:shadow-none w-full  text-[14px] rounded cursor-pointer "
                                key={i}><Skeleton className="w-full min-h-[45px]"/></div>
                        ))
                    }
                </>
            }
        </div>
    )
}

export default TopCity;