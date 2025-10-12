import PropTypes from "prop-types";
import styles from './styles/index.module.css';
import {useEffect, useRef, useState} from "react";
import Card from "./components/Card.jsx";
import image1 from "./assets/guy.jpeg"
import image2 from "./assets/person2.jpg"
import image3 from "./assets/person3.jpg"


// TODO: For some reason I don't need loading anymore?
function FetchedProfiles({modeToggle, id}) {

    const [textInput, setTextInput] = useState("");
    const [job, setJob] = useState('None Chosen');
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchData(){
        const response = await fetch(`https://web.ics.purdue.edu/~jshabel/fetch-data-with-id.php?id=${id}`);
        const result = await response.json();
        setProfile(result[0]);
        if (loading === true){
            setLoading(false);
        }
    }


    useEffect( () => {
        fetchData();

    }, [loading, textInput, job]);

    return (
        <>
            <div className={modeToggle ? styles.appBodyDark : styles.appBodyLight}>
                <Card name={profile.name} title={profile.title} email={profile.email}
                                  img={profile.image_url}/>
                <footer></footer>
            </div>
        </>
    )
}

FetchedProfiles.propTypes = {
    modeToggle: PropTypes.any, // TODO: figure out what this should be
    id: PropTypes.any,
}

export default FetchedProfiles
