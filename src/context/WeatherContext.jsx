"use client"
import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {currentGeo} from "@/utils/tool";
import api from "@/utils/request";

const WeatherContext = createContext();


export const useWeather = () => useContext(WeatherContext);

export const WeatherContextProvider = ({children}) => {

    const [hotCity, setHotCity] = useState([]);
    // get hot city
    const getHotCity = () => {
        axios.get("/api/hot-city").then(res => {
            setHotCity(res.data.topCityList);
        })
    }
    useEffect(() => {
        getHotCity();
    }, []);

    // user choose city
    const [cityId, setCityId] = useState(null);
    const [todayWeather, setTodayWeather] = useState(null);
    const [currentCity, setCurrentCity] = useState(null);

    const [geolocation, setGeolocation] = useState(null);

    const [nowWeather, setNowWeather] = useState(null);


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
        api.get(`/v7/weather/3d?location=${cityId}`).then(res => {
            setTodayWeather(res.data.daily);
        })
    }

    useEffect(() => {
        if (!cityId) return;
        getToday();
    }, [cityId]);


    const value = {hotCity, handleChooseCity, cityId, todayWeather, currentCity, nowWeather};
    return (
        <WeatherContext.Provider value={value}>
            {children}
        </WeatherContext.Provider>
    )
}