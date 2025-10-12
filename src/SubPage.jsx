import PropTypes from "prop-types";
import {Navigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Navbar from "./components/Navbar.jsx";
import Home from './Home.jsx'
import About from './About.jsx'
import NotFound from "./NotFound.jsx";

function SubPage(modeToggle) {
    const { page } = useParams();
    function chooseSubpage() {
		console.log(page);
        switch(page) {
            case "Home":
                return <Home modeToggle={modeToggle}/>
            case "About":
                return <About modeToggle={modeToggle}/>
            default:
                return <Navigate to="/profile-app-fixed/notFound"/>;
        }
    }
    return (
        <div >
            <div>
                {chooseSubpage()}
            </div>
        </div>
    );
}

SubPage.propTypes = {
    page: PropTypes.string,
	modeToggle: PropTypes.bool
}

export default SubPage;
