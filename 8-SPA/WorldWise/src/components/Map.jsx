import style from "./Map.module.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useState} from "react";
import {useCities} from "../contexts/CitiesContext.jsx";


const Map = () => {

    const navigate = useNavigate()
    const [mapPosition, setMapPosition] = useState([40, 0]);

    const {cities} = useCities();

    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")

    console.log(lat);

    return (
        <div className={style.mapContainer}>
            <MapContainer center={mapPosition} zoom={13} scrollWhellZoom={true} className={style.map}>
                {console.log("oi " + mapPosition)}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {cities.map((city) => (
                    <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                        <Popup>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}


            </MapContainer>
        </div>
    );
};

export default Map;
