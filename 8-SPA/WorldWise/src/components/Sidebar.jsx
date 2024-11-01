import styles from "./Sidebar.module.css"
import Logo from "./Logo.jsx";

import AppNav from "./AppNav.jsx";

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>

            <p>List of cities</p>

            <footer className={styles.footer}>
                <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by gui</p>
            </footer>
        </div>
    );
};

export default Sidebar;