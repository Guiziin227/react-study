import style from "./Map.module.css"
import {useNavigate, useSearchParams} from "react-router-dom";

const Map = () => {

    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")

    return (
        <div className={style.mapContainer} onClick={() => navigate("form")}>
            <h1>Map</h1>
            <p>Position Lat:{lat}, Lng:{lng}</p>

            <button onClick={
                () => {
                    setSearchParams({lat: 32, lng: 42});
                }
            }>
                Change position
            </button>
        </div>
    );
};

export default Map;