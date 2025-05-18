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
                    reject(error);
                }
            );
        } else {
            reject(new Error("Geolocation not supported"));
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