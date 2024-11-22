// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import {useEffect, useState} from "react";

import styles from "../../../../../../udemy/ultimate-react-course-main/11-worldwise/starter/components/Form.module.css";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import BackButton from "./BackButton.jsx";
import {useUrlPosition} from "../hooks/useUrlPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";


const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
    const [lat, lng] = useUrlPosition()
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [geocodingError, setGeocodingError] = useState("");


    const navigate = useNavigate();

    const [isLoadingGeocoding, setLoadingGeocoding] = useState(false);

    useEffect(() => {

        async function fetchCityData() {
            try {
                setGeocodingError("");
                setLoadingGeocoding(true);
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();
                console.log(data)

                if (!data.countryCode) throw new Error("Clique em uma cidade válida");
                setCityName(data.city || data.locality || "")
                setCountry(data.countryName)

            } catch (err) {
                setGeocodingError(err.message)
            } finally {
                setLoadingGeocoding(false);
            }
        }

        fetchCityData()

    }, [lat, lng]);

    if (isLoadingGeocoding) return <Spinner/>
    if (geocodingError) return <Message message={geocodingError}/>;

    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                {/*<span className={styles.flag}>{emoji}</span>*/}
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <input
                    id="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <BackButton/>
            </div>
        </form>
    );
}

export default Form;
