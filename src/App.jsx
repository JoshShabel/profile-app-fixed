import {useEffect, useRef, useState} from "react";
import './App.css'
import styles from './styles/index.module.css';
import Introduction from "./components/Introduction.jsx";
import Card from "./components/Card.jsx";
import Navbar from "./components/Navbar.jsx";
import Wrapper from "./components/Wrapper.jsx"
import ProfileForm from "./components/ProfileForm.jsx";
import image1 from "./assets/guy.jpeg"
import image2 from "./assets/person2.jpg"
import image3 from "./assets/person3.jpg"

function App() {

    const [textInput, setTextInput] = useState("");
    const [job, setJob] = useState('None Chosen');
    const [modeToggle, setModeToggle] = useState(true);
    const [formState, setFormState] = useState(0);
    const [titles, setTitles] = useState(["", ""]);
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);
    const [loadingTitles, setLoadingTitles] = useState(true);



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
        console.log(titles);
        if (loadingTitles === true){
            setLoadingTitles(false);
        }
    }

    async function getFilteredTitlesList(){
        var page = 1;
        var search = textInput;
        var title = job;
        const response = await fetch("https://web.ics.purdue.edu/~jshabel/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=10");
        const result = await response.json();
        console.log(result);
        if (loading === true){ // this shouldn't be needed, but I might as well be safe?
            setLoading(false);
        }
    }


    useEffect( () => {
        if (textInput === "" || job === "None Chosen"){
            getTitlesList();
            fetchData();
            if (!(loadingData || loadingTitles)){
                setLoading(false);
            }
        }
        else{
            getFilteredTitlesList();
        }

    }, [formState, loading, textInput, job]);

    function handleFormState() {
        setFormState(formState + 1);
    }

    const handleChange = (event) => {
        setJob(event.target.value);
    };

    const appModeToggleFunction = () => {
        setModeToggle(prevModeToggle => !prevModeToggle);
    }

    return (
        <>
            <Navbar modeToggle={modeToggle} setModeToggleFunction={appModeToggleFunction}/>
            <div className={modeToggle ? styles.appBodyDark : styles.appBodyLight}>
                <h1>My React App</h1>
                <Wrapper children={<Introduction/>}/>
                <ProfileForm handleFormState={handleFormState}></ProfileForm>
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
                    {
                        profiles.map((profile) => (
                            <Card key={profile.email} name={profile.name} title={profile.title} email={profile.email}
                                  img={profile.image_url} textFilter={textInput} job={job}/>
                        ))

                    }
                </div>
                <footer></footer>
            </div>
        </>
    )
}

export default App