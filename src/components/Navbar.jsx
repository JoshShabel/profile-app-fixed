import { Link } from "react-router-dom";
import styles from '../styles/Navbar.module.css'
import PropTypes from "prop-types";
import {Navigate} from "react-router-dom"

const Navbar = ({modeToggle, setModeToggleFunction, setNavigateText}) => {

    console.log("hello");
    return (
        <nav className={modeToggle ? styles.navbarDark : styles.navbarLight}>
            <div>
                <Link to="/profile-app-fixed/Home">
                    <button className={modeToggle ? styles.leftButtonDark : styles.leftButtonLight}>Home</button>
                </Link>
                <Link to="/profile-app-fixed/About">
                    <button className={modeToggle ? styles.leftButtonDark : styles.leftButtonLight}>About</button>
                </Link>
                <Link to="/profile-app-fixed/Profiles">
                    <button className={modeToggle ? styles.leftButtonDark : styles.leftButtonLight}>Profiles</button>
                </Link>
            </div>
            <div>
                <h3 className={styles.rightButtonTwo}>Toggle mode:</h3>
                <button className={modeToggle ? styles.rightButtonOneDark : styles.rightButtonOneLight} onClick={setModeToggleFunction}>
                    {modeToggle ? "Dark" : "Light"}
                </button>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    modeToggle: PropTypes.bool,
    setModeToggleFunction: PropTypes.func,
    setNavigateFunction: PropTypes.any,
}

export default Navbar;