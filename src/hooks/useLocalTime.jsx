import {useEffect, useMemo, useState} from "react";

export const useLocalTime = (tz) => {
    const [time, setTime] = useState("");
    const formatter = useMemo(() => {
        return new Intl.DateTimeFormat( "default", {
            timeZone:tz||"UTC",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
    }, [tz]);

    useEffect(() => {
        const a = setInterval(() => {
            setTime(formatter.format(new Date()));
        }, 1000)

        return () => {
            clearInterval(a);
        }
    }, [formatter]);

    return {
        time,
    }
}