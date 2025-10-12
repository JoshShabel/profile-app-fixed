import PropTypes from "prop-types";
import styles from './styles/index.module.css';
import {useEffect, useRef, useState} from "react";
import Card from "./components/Card.jsx";
import image1 from "./assets/guy.jpeg"
import image2 from "./assets/person2.jpg"
import image3 from "./assets/person3.jpg"
import { useContext } from 'react';
import ModeContext from "./ModeContext.jsx";


// TODO: For some reason I don't need loading anymore?
function ProfileDetail({id}) {
    const { isOn, toggleOn } = useContext(ModeContext);
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
console.log(isOn);
    return (
        <>
            <div className={isOn ? styles.appBodyDark : styles.appBodyLight}>
                <Card name={profile.name} title={profile.title} email={profile.email}
                                  img={profile.image_url}/>
                <footer></footer>
            </div>
        </>
    )
}

ProfileDetail.propTypes = {
    id: PropTypes.any,
}

export default ProfileDetail
