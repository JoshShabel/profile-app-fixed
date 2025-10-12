import {StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import NotFound from "./NotFound.jsx";
import About from "./About.jsx";
import './App.css'
import PropTypes from "prop-types";
import styles from './styles/index.module.css';
import Introduction from "./components/Introduction.jsx";
import Card from "./components/Card.jsx";
import Navbar from "./components/Navbar.jsx";
import Wrapper from "./components/Wrapper.jsx"
import ProfileForm from "./components/ProfileForm.jsx";
import image1 from "./assets/guy.jpeg"
import image2 from "./assets/person2.jpg"
import image3 from "./assets/person3.jpg"
import SubPage from "./SubPage.jsx";

// TODO: light dark mode toggle. When did i break this?

function App() {
    const [modeToggle, setModeToggle] = useState(true);

    const appModeToggleFunction = () => {
        setModeToggle(prevModeToggle => !prevModeToggle);
    }

    return (
        <>
            <BrowserRouter>
                <Navbar modeToggle={modeToggle} setModeToggleFunction={appModeToggleFunction}/>
                <Routes>
                    <Route path="/profile-app-fixed/" element={<Navigate to="/profile-app-fixed/Home"/>}/>
                    <Route path="/profile-app-fixed/notFound" element={<NotFound/>}/>
                    <Route path="/profile-app-fixed/:page" element={<SubPage modeToggle={modeToggle}/>}/>
                    <Route path="/profile-app-fixed/:page/profile/:id" element={<SubPage modeToggle={modeToggle}/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App