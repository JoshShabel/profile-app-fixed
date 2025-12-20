import PropTypes from "prop-types";
import Introduction from "./components/Introduction.jsx";
import Wrapper from "./components/Wrapper.jsx"
import styles from './styles/index.module.css';
import {lazy, Suspense, useCallback, useContext, useLayoutEffect} from 'react';
import ModeContext from "./ModeContext.jsx";
import {useEffect, useRef, useState} from "react";
import Card from "./components/Card.jsx";
import ProfileForm from "./components/ProfileForm.jsx";
import { useReducer } from "react";



function Home() {
    const [textInput, setTextInput] = useState("");
    const [job, setJob] = useState('None Chosen');
    const [titles, setTitles] = useState(["", ""]);
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

    const LazyComponent = lazy(() =>
        import("./LazyComponent.jsx"));

    const [formState, dispatch] = useReducer(reducerFunction,  0);
    const [profilesState, updateProfiles] = useReducer(reducerFunction,  0);



    // TODO: validate email key
    async function getTitlesList(){
        const response = await fetch("https://web.ics.purdue.edu/~jshabel/get-titles.php");
        const result = await response.json();
        var titleVariable = result.JSON.Data;
        setTitles(titleVariable);
    }






    useEffect( () => {
        if (textInput === "" || job === "None Chosen"){
            updateProfiles("update")
            focusRef.current.focus();
            getTitlesList()
        }
    }, [formState, job]);

    const handleChange = useCallback((event) => {
        setJob(event.target.value);
    }, []);
    
    return (
        <>
            <div className={isOn ? styles.appBodyDark : styles.appBodyLight}>
                <h1 >My React App</h1>

                <Wrapper children={<Introduction/>}/>
                <ProfileForm handleFormState={() => dispatch("update")}></ProfileForm>
                <label>Choose Job:</label>
                <select style={{width: "150px"}} value={job} onChange={handleChange}>
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
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyComponent profiles={profilesState} textInput={textInput} job={job}/>
                </Suspense>
                <footer></footer>
            </div>
        </>
    )
}


export default Home
