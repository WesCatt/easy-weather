"use client"
import "leaflet/dist/leaflet.css"
import Card from "@/components/Card";
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {useWeather} from "@/context/WeatherContext";
import {Skeleton} from "@/components/ui/skeleton";

const Map = () => {
    const {currentCity} = useWeather();
    return (
        <Card
            className="!p-0 overflow-hidden col-span-12 lg:col-span-6 lg:row-span-6 row-span-20 lg:col-start-5  !min-h-[600px] lg:row-start-7 md:col-span-8 ">
            {
                currentCity ? <>
                    <MapContainer center={[currentCity?.lat, currentCity?.lon]} zoom={20} className={"w-full h-full"}>
                        <TileLayer
                            attribution='© OpenStreetMap contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[currentCity?.lat, currentCity?.lon]}>
                            <Popup>
                                {currentCity.name} <br/>
                            </Popup>
                        </Marker>
                    </MapContainer></> : <Skeleton className="w-full h-full"/>
            }
        </Card>
    )
}
export default Map;