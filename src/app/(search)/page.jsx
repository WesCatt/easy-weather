"use client"
import Header from "@/components/Header";
import {TodayWeather} from "@/components/TodayWeather";
import AirQuality from "@/components/AirQuality";
import HoursDegree from "@/components/HoursDegree";
import SunSet from "@/components/SunSet";
import WindSpeed from "@/components/WindSpeed";
import UVIndex from "@/components/UVIndex";
import Precipitation from "@/components/Precipitation";
import FutureWeather from "@/components/FutureWeather";
import FeelDegree from "@/components/FeelDegree";
import Humidity from "@/components/Humidity";
import Visibility from "@/components/Visibility";
import Pressure from "@/components/Pressure";
import TopCity from "@/components/TopCity";
import {useWeather} from "@/context/WeatherContext";
import dynamic from "next/dynamic";
import {useEffect} from "react";

const Map = dynamic(() => import("@/components/Map"), {ssr: false})

const Search = () => {
    const {currentCity, todayWeather, handleChooseCity} = useWeather();
    useEffect(() => {
        document.title = `简单小天气-${`${currentCity?.name} (${currentCity?.country} ${currentCity?.adm1})` || "上海"}`
    }, [currentCity]);
    return (
        <>
            <Header onClick={handleChooseCity}/>
            <main className="grid grid-rows-12 w-full gap-2 py-3">
                <TodayWeather weather={todayWeather}/>
                <AirQuality weather={todayWeather}/>
                <HoursDegree/>
                <SunSet/>
                <WindSpeed/>
                <UVIndex/>
                <Precipitation/>


                <FutureWeather/>
                <FeelDegree/>
                <Humidity/>
                <Visibility/>
                <Pressure/>
                <Map/>
                <TopCity onClick={handleChooseCity}/>
            </main>
        </>
    )
}


export default Search;