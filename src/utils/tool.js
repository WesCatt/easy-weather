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


