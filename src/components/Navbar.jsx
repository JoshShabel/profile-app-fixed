import styles from '../styles/Navbar.module.css'
import PropTypes from "prop-types";

const Navbar = ({modeToggle, setModeToggleFunction}) => {
    return (
        <nav className={modeToggle ? styles.navbarDark : styles.navbarLight}>
            <div>
                <button className={modeToggle ? styles.leftButtonDark : styles.leftButtonLight}>Home</button>
                <button className={modeToggle ? styles.leftButtonDark : styles.leftButtonLight}>About</button>
                <button className={modeToggle ? styles.leftButtonDark : styles.leftButtonLight}>Profiles</button>
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
}

export default Navbar;