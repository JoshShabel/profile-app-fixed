import PropTypes from 'prop-types';
import Card from "./components/Card.jsx";
import {useContext, useEffect, useState} from "react";
import ModeContext from "./ModeContext.jsx";
/*
const { isOn } = useContext(ModeContext);
*/
import styles from './styles/index.module.css';
import  useFetch  from "./useFetch.jsx";


// It doesn't do much to the children right now in terms of formatting, I don't currently have anything
// I specifically want to apply to separate containers on multiple components in terms of formatting.
function LazyComponent({profilesState, textInput, job}){
    const [profiles, setProfiles] = useState([]);


    console.log(job)
    async function fetchData(){
        const response = await fetch("https://web.ics.purdue.edu/~jshabel/fetch-data.php");
        const result = await response.json();
        setProfiles(result);
    }

    useEffect( () => {
            fetchData();
    }, [profilesState]);
    return (
        <div className={/*isOn ? */styles.darkCardDisplayArea/* : styles.lightCardDisplayArea*/}>
            {
                profiles.map((profile) => (
                    <Card key={profile.email} name={profile.name} title={profile.title} email={profile.email}
                          img={profile.image_url} textFilter={textInput} job={job}/>
                ))
            }
        </div>
    )
}

LazyComponent.propTypes = {
    textInput: PropTypes.string,
    profiles: PropTypes.array,
}

export default LazyComponent;