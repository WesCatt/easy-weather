"use client"
import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {currentGeo} from "@/utils/tool";
import api from "@/utils/request";
import countries from "i18n-iso-countries"
import zh from "i18n-iso-countries/langs/zh.json";
import {toast} from "sonner";

const WeatherContext = createContext();

countries.registerLocale(zh);

export const useWeather = () => useContext(WeatherContext);

export const WeatherContextProvider = ({children}) => {

    const [hotCity, setHotCity] = useState([]);


    // user choose city
    const [cityId, setCityId] = useState(null);
    const [todayWeather, setTodayWeather] = useState(null);
    const [currentCity, setCurrentCity] = useState(null);

    const [geolocation, setGeolocation] = useState(null);

    const [nowWeather, setNowWeather] = useState(null);

    // get hot city
    const getHotCity = () => {
        const code = countries.getAlpha2Code(currentCity?.country, 'zh')?.toLowerCase();
        axios.get(`/api/hot-city?range=${code || "cn"}`).then(res => {
            setHotCity(res.data.topCityList);
        })
    }
    useEffect(() => {
        getHotCity();
    }, [currentCity]);

    const handleNowWeather = () => {
        if (!geolocation && !cityId) return;
        api.get(`/v7/weather/now?location=${cityId || geolocation}`).then(res => {
            setNowWeather(res.data.now);
        }).catch(res => {
            console.log(res);
        })
    }

    useEffect(() => {
        handleNowWeather();
    }, [geolocation, cityId]);

    useEffect(() => {
        currentGeo().then(res => {
            setCityId(res);
            setGeolocation(res);
        })
    }, []);


    useEffect(() => {
        if (!geolocation) return;
        setCurrentCity(null);
        axios.get(`/api/search-city?location=${geolocation}`).then(res => {
            setCurrentCity(res.data.location[0]);
        }).catch(res => {
            console.log(res);
        })
    }, [geolocation]);


    const handleChooseCity = (id) => {
        setCityId(id);
    }


    const getToday = () => {
        setTodayWeather(null);
        api.get(`/v7/weather/10d?location=${cityId}`).then(res => {
            setTodayWeather(res.data.daily);
        })
    }

    const getCity = () => {
        setCurrentCity(null);
        axios.get(`/api/search-city?location=${cityId}`).then(res => {
            setCurrentCity(res.data.location[0]);
            console.log(res.data.location[0])
            toast(`成功切换城市!,现在所在城市为${res.data.location[0].name} (${res.data.location[0].country} ${res.data.location[0].adm1})`, {
                action: {
                    label: "关闭",
                },
                className: "!text-[12px]"
            });
        }).catch(res => {
            console.log(res);
        });
    }

    useEffect(() => {
        if (!cityId) return;
        getToday();
        getCity();
    }, [cityId]);


    const value = {hotCity, handleChooseCity, cityId, todayWeather, currentCity, nowWeather};
    return (
        <WeatherContext.Provider value={value}>
            {children}
        </WeatherContext.Provider>
    )
}