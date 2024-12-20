import style from "./CityList.module.css"
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";

const CityList = () => {
    const {cities, isLoading} = useCities()
    if (isLoading) return <Spinner/>
    if (!cities.length) return <Message message="Adicione uma cidade"/>
    return (
        <ul className={style.cityList}>
            {cities.map((city, i) => (<CityItem key={i} city={city}/>))}
        </ul>
    );
};

export default CityList;