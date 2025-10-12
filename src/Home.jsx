import PropTypes from "prop-types";
import Introduction from "./components/Introduction.jsx";
import Wrapper from "./components/Wrapper.jsx"
import styles from './styles/index.module.css';
import { useContext } from 'react';
import ModeContext from "./ModeContext.jsx";
function Home() {
    const { isOn, toggleOn } = useContext(ModeContext);
    return (
        <>
            <div className={isOn ? styles.appBodyDark : styles.appBodyLight}>
                <h1>My React App</h1>
                <Wrapper children={<Introduction/>}/>
                <footer></footer>
            </div>
        </>
    )
}


export default Home
