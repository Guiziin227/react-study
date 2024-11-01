import styles
    from "../../../../../../udemy/ultimate-react-course-main/11-worldwise/starter/components/CountryItem.module.css";

function CountryItem({country}) {
    return (
        <li className={styles.countryItem}>
            <span>{country.emoji}</span>
            <span>{country.country}</span>
        </li>
    );
}

export default CountryItem;
