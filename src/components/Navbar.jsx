import { Link } from "react-router-dom";
import styles from '../styles/Navbar.module.css'
import PropTypes from "prop-types";
import {Navigate} from "react-router-dom"
import { useContext } from 'react';
import ModeContext from "../ModeContext.jsx";
const Navbar = () => {
    const { isOn, toggleOn } = useContext(ModeContext);

    return (
        <nav className={isOn ? styles.navbarDark : styles.navbarLight}>
            <div>
                <Link to="/profile-app-fixed/Home">
                    <button className={isOn ? styles.leftButtonDark : styles.leftButtonLight}>Home</button>
                </Link>
                <Link to="/profile-app-fixed/About">
                    <button className={isOn ? styles.leftButtonDark : styles.leftButtonLight}>About</button>
                </Link>
                <Link to="/profile-app-fixed/fetched-profiles">
                    <button className={isOn ? styles.leftButtonDark : styles.leftButtonLight}>Profiles</button>
                </Link>
                <Link to="/profile-app-fixed/AddProfiles">
                    <button className={isOn ? styles.leftButtonDark : styles.leftButtonLight}>Add Profiles</button>
                </Link>
            </div>
            <div>
                <h3 className={styles.rightButtonTwo}>Toggle mode:</h3>
                <button className={isOn ? styles.rightButtonOneDark : styles.rightButtonOneLight} onClick={toggleOn}>
                    {isOn ? "Dark" : "Light"}
                </button>
            </div>
        </nav>
    );
};

Navbar.propTypes = {

}

export default Navbar;