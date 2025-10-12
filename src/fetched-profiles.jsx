import PropTypes from "prop-types";
import styles from './styles/index.module.css';
import {useEffect, useRef, useState} from "react";
import Card from "./components/Card.jsx";
import image1 from "./assets/guy.jpeg"
import image2 from "./assets/person2.jpg"
import image3 from "./assets/person3.jpg"


// TODO: For some reason I don't need loading anymore?
function FetchedProfiles(modeToggle) {

    const [textInput, setTextInput] = useState("");
    const [job, setJob] = useState('None Chosen');
    const [titles, setTitles] = useState(["", ""]);
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);
    const [loadingTitles, setLoadingTitles] = useState(true);
    const [none, setNone] = useState(false);


    async function fetchData(){
        const response = await fetch("https://web.ics.purdue.edu/~jshabel/fetch-data.php");
        const result = await response.json();
        setProfiles(result);
        if (loadingData === true){
            setLoadingData(false);
        }
    }
    // TODO: validate email key
    async function getTitlesList(){
        const response = await fetch("https://web.ics.purdue.edu/~jshabel/get-titles.php");
        const result = await response.json();
        var titleVariable = result.JSON.Data;
        setTitles(titleVariable);
        //console.log(titles);
        if (loadingTitles === true){
            setLoadingTitles(false);
        }
    }

    async function getFilteredTitlesList(){
        var page = 1;
        var search = textInput;
        var title = job;
        const response = await fetch(`https://web.ics.purdue.edu/~jshabel/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=10`);

        const result = await response.json();
        if (result.error === "No profiles found"){
            setNone(true);
        }
        else{
            setProfiles(result);
            if (loading === true){ // this shouldn't be needed, but I might as well be safe?
                setLoading(false);
            }
            setNone(false);
        }
    }


    useEffect( () => {
        if (textInput === "" || job === "None Chosen"){
            setNone(false);
            getTitlesList();
            fetchData();
            if (!(loadingData || loadingTitles)){
                setLoading(false);
            }
        }
        else{
            getFilteredTitlesList();
        }

    }, [loading, textInput, job]);



    const handleChange = (event) => {
        setJob(event.target.value);
    };

    return (
        <>
            <div className={modeToggle ? styles.appBodyDark : styles.appBodyLight}>
                <label>Choose Job:</label>
                <select value={job} onChange={handleChange}>
                    <option value="None Chosen">None Chosen</option>
                    {
                        titles.map((title, i) => (
                            <option key={i} value={title}>{title}</option>
                        ))
                    }
                </select>
                <label>What is their name?</label>
                <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                />
                <button onClick={
                    () => {
                        setTextInput("");
                        setJob("None Chosen");
                    }
                }>Reset
                </button>
                <br/>
                <div className={modeToggle ? styles.darkCardDisplayArea : styles.lightCardDisplayArea}>
                    {none        ? null
                        : profiles.map((profile) => (
                            <Card key={profile.email} name={profile.name} title={profile.title} email={profile.email}
                                  img={profile.image_url}/>
                        ))
                    }
                </div>
                <footer></footer>
            </div>
        </>
    )
}

FetchedProfiles.propTypes = {
    modeToggle: PropTypes.any, // TODO: figure out what this should be
}

export default FetchedProfiles
