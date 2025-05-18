export async function currentGeo() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve(`${longitude},${latitude}`);
                },
                (error) => {
                    resolve("39.90499,116.40529");
                }
            );
        } else {
            resolve("北京");
        }
    });
}


export function weekToday(tz) {
    try {
        return Intl.DateTimeFormat("zh-CN", {
            timeZone: tz,
            weekday: "long",
        }).format(new Date());
    } catch (e) {
        return Intl.DateTimeFormat("zh-CN", {
            weekday: "long",
        }).format(new Date());
    }
}

export function getWeekDay(time, tz) {
    if (!time) return;
    let date = new Date(time);
    return Intl.DateTimeFormat("zh-CN", {
        timeZone: tz,
        weekday: "long",
    }).format(date);
}

export function getHour(time, tz, hasMinute = true) {
    if (!time) return;
    let testDate = new Date(time);
    if (isNaN(testDate.getTime())) {
        let date = new Date();
        const [hour, minutes] = time.split(":");
        date.setHours(hour, minutes);
        return new Intl.DateTimeFormat("default", {
            timeZone: tz || "Asia/Shanghai",
            hour: "2-digit",
            minute: hasMinute ? "2-digit" : false,
        }).format(date)
    } else {
        return new Intl.DateTimeFormat("default", {
            timeZone: tz || "Asia/Shanghai",
            hour: "2-digit",
            hour12: hasMinute,
            minute: hasMinute ? "2-digit" : undefined,
        }).format(testDate)
    }
}


export function parseTime(timeStr, timezone) {
    const [hour, minute] = timeStr.split(":").map(Number);
    const now = new Date();

    const target = new Date(
        new Date().toLocaleString("default", {timeZone: timezone})
    );

    target.setHours(hour);
    target.setMinutes(minute);
    target.setSeconds(0);
    target.setMilliseconds(0);

    return target;
}

export function getSkyPhase(now, sunrise, sunset, moonrise, moonset, timezone) {
    const nowTz = new Date(new Date().toLocaleString("default", {timeZone: timezone}));
    const sr = parseTime(sunrise, timezone);
    const ss = parseTime(sunset, timezone);

    if (nowTz >= sr && nowTz < ss) {
        return "sun"; // 白天，显示日出/日落
    }
    return "moon"; // 晚上且在月亮期间，显示月出/月落
}

export function getMonth(time) {
    let date = new Date(time);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}月${date.getDate().toString().padStart(2, "0")}日`
}