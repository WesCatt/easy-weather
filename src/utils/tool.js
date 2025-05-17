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


export function getHour(time,tz) {
    if (!time) return;
    let date = new Date();
    const [hour, minutes] = time.split(":");
    date.setHours(hour, minutes);
    console.log(date);
    return new Intl.DateTimeFormat("default", {
        timeZone:tz||"Asia/Shanghai",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date)
}