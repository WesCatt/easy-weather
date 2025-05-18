"use client"
import ThemeToggle from "@/components/ThemeToggle";
import {Button} from "@/components/ui/button";
import {FaGithub} from "react-icons/fa6";
import {
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandDialog
} from "@/components/ui/command";
import {useEffect, useState} from "react";
import {useWeather} from "@/context/WeatherContext";
import axios from "axios";
import {Skeleton} from "@/components/ui/skeleton";

const Header = ({onClick}) => {
    const [open, setOpen] = useState(false);
    const {hotCity} = useWeather();
    const [cityName, setCityName] = useState("");
    const [searchedCity, setSearchedCity] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!cityName) return;
        setLoading(true);
        setSearchedCity([]);
        const a = setTimeout(() => {
            axios.get(`/api/search-city?location=${cityName}`).then(res => {
                setSearchedCity(res.data.location);
            }).catch(res => {

            }).finally(() => {
                setLoading(false);
            })
        }, 1000);
        return () => {
            clearTimeout(a);
            setLoading(false);
        }
    }, [cityName]);
    return (
        <header className="flex items-center justify-between gap-2">
            <ThemeToggle/>
            <div className="flex items-center gap-2">
                <CommandDialog open={open} onOpenChange={setOpen}>
                    <input className="p-4 border-b outline-none text-[14px]" onChange={e => setCityName(e.target.value)}
                           value={cityName} placeholder={"输入城市名称搜索..."}></input>
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="查询列表">
                            {
                                loading ? <Skeleton className="w-full h-[100px]"/> : searchedCity?.map(city => (
                                    <CommandItem onSelect={() => onClick(city.id, city.name)}
                                                 key={city.id}>{city.country} {city.adm1} {city.name} </CommandItem>

                                ))
                            }
                        </CommandGroup>
                        <CommandGroup heading="建议城市">
                            {
                                hotCity?.map(city => (
                                    <CommandItem onSelect={() => onClick(city.id, city.name)}
                                                 key={city.id}>{city.country} {city.adm1} {city.name} </CommandItem>
                                ))
                            }
                        </CommandGroup>
                    </CommandList>
                </CommandDialog>
                <button onClick={() => setOpen(true)}
                        className={"bg-zinc-100 dark:bg-zinc-900 px-4  min-w-[300px] py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"}>
                    <p className={"font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600  dark:group-hover:text-zinc-300 transition"}>Search</p>
                    <kbd
                        className={"point-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"}>
                        <span className={"text-xs"}>shift + alt + k</span>
                    </kbd>
                </button>
                <a href="https://github.com/Westcatboy/easy-weather" target="_blank">
                    <Button className="!px-3 cursor-pointer font-[500]"><FaGithub/> Look At GitHub</Button>
                </a>
            </div>
        </header>
    )
}
export default Header;