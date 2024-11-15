import Spinner from "./Spinner.jsx";
import style from "./CountryList.module.css"
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";

import {useCities} from "../contexts/CitiesContext.jsx";

const CountriesList = () => {
    const {cities, isLoading} = useCities()
    if (isLoading) return <Spinner/>
    if (!cities.length) return <Message message="Adicione uma cidade"/>

    const countries = cities.reduce((arr, city) => {
        // Verifica se o país já está no array acumulador 'arr'
        if (!arr.map(el => el.country).includes(city.country)) {
            // Adiciona o país e emoji ao array se não estiver presente
            return [...arr, {country: city.country, emoji: city.emoji}];
        } else {
            // Retorna o acumulador sem alterações se o país já estiver presente
            return arr;
        }
    }, []);//começa o array 0


    return (
        <ul className={style.countryList}>
            {countries.map((country, i) => (<CountryItem key={i} country={country}/>))}
        </ul>
    );
};

export default CountriesList;