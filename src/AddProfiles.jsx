import PropTypes from "prop-types";
import Introduction from "./components/Introduction.jsx";
import Wrapper from "./components/Wrapper.jsx"
import styles from './styles/index.module.css';
import ProfileForm from "./components/ProfileForm.jsx";
import {useState} from "react";

function AddProfiles(modeToggle) {
    const [formState, setFormState] = useState(0);

    function handleFormState() {
        setFormState(formState + 1);
    }
    return (
        <>
            <div className={modeToggle ? styles.appBodyDark : styles.appBodyLight}>
                <ProfileForm handleFormState={handleFormState}></ProfileForm>
            </div>
        </>
    )
}

AddProfiles.propTypes = {
    modeToggle: PropTypes.any, // TODO: figure out what this should be
}

export default AddProfiles
