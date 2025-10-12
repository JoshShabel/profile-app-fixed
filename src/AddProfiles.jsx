import PropTypes from "prop-types";
import Introduction from "./components/Introduction.jsx";
import Wrapper from "./components/Wrapper.jsx"
import styles from './styles/index.module.css';
import ProfileForm from "./components/ProfileForm.jsx";
import {useState} from "react";
import { useContext } from 'react';
import ModeContext from "./ModeContext.jsx";

function AddProfiles() {
    const { isOn, toggleOn } = useContext(ModeContext);
    const [formState, setFormState] = useState(0);

    function handleFormState() {
        setFormState(formState + 1);
    }
    return (
        <>
            <div className={isOn ? styles.appBodyDark : styles.appBodyLight}>
                <ProfileForm handleFormState={handleFormState}></ProfileForm>
            </div>
        </>
    )
}

export default AddProfiles
