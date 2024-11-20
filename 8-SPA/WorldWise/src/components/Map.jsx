import style from "./Map.module.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useState} from "react";

const Map = () => {

    const navigate = useNavigate()
    const [mapPosition, setMapPosition] = useState([40, 0]);

    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")

    return (
        <div className={style.mapContainer}>
            <MapContainer center={mapPosition} zoom={13} scrollWhellZoom={false} className={style.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker position={mapPosition}>
                    <Popup>
                        Ola
                    </Popup>
                </Marker>


            </MapContainer>
        </div>
    );
};

export default Map;