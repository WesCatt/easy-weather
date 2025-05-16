export function currentCity() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            return longitude + "," + latitude
        })
    }

    return "北京";
}