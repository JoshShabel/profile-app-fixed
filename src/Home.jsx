import PropTypes from "prop-types";
import Introduction from "./components/Introduction.jsx";
import Wrapper from "./components/Wrapper.jsx"
import styles from './styles/index.module.css';
import {useContext, useLayoutEffect} from 'react';
import ModeContext from "./ModeContext.jsx";
import {useEffect, useRef, useState} from "react";
import Card from "./components/Card.jsx";
import ProfileForm from "./components/ProfileForm.jsx";
import { useReducer } from "react";



function Home() {
    const [textInput, setTextInput] = useState("");
    const [job, setJob] = useState('None Chosen');
    const [titles, setTitles] = useState(["", ""]);
    const [profiles, setProfiles] = useState([]);
    const { isOn, toggleOn } = useContext(ModeContext);
    const focusRef = useRef(null);
    const reducerFunction = (state, action) => {
        switch (action.type) {
            case "update":
                return state + 1;
            default:
                console.log("this should never be reached")
                return state + 1;
        }
    }

    const [formState, dispatch] = useReducer(reducerFunction,  0);


    async function fetchData(){
        const response = await fetch("https://web.ics.purdue.edu/~jshabel/fetch-data.php");
        const result = await response.json();
        setProfiles(result);
    }
    // TODO: validate email key
    async function getTitlesList(){
        const response = await fetch("https://web.ics.purdue.edu/~jshabel/get-titles.php");
        const result = await response.json();
        var titleVariable = result.JSON.Data;
        setTitles(titleVariable);
        /*console.log(titles);*/
    }

    async function getFilteredTitlesList(){
        const response = await fetch("https://web.ics.purdue.edu/~jshabel/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=10");
        const result = await response.json();
        /*console.log(result);*/
/*        if (loading === true){ // this shouldn't be needed, but I might as well be safe?
            setLoading(false);
        }*/
    }




    useEffect( () => {
        if (textInput === "" || job === "None Chosen"){
            getTitlesList();
            fetchData();
/*            if (!(loadingData || loadingTitles)){
                setLoading(false);
            }*/
            focusRef.current.focus();
        }
        else{
            getFilteredTitlesList();
        }

    }, [formState, textInput, job]);

    const handleChange = (event) => {
        setJob(event.target.value);
    };
    
    return (
        <>
            <div className={isOn ? styles.appBodyDark : styles.appBodyLight}>
                <h1 >My React App</h1>

                <Wrapper children={<Introduction/>}/>
                <ProfileForm handleFormState={() => dispatch("update")}></ProfileForm>
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
                    ref={focusRef}
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
                <div className={isOn ? styles.darkCardDisplayArea : styles.lightCardDisplayArea}>
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


export default Home
