import styles from "../../../../../../udemy/ultimate-react-course-main/11-worldwise/starter/components/Logo.module.css";
import {Link} from "react-router-dom";

function Logo() {
    return <Link to="/">
        <img src="/logo.png" alt="WorldWise logo" className={styles.logo}/>
    </Link>
}

export default Logo;
