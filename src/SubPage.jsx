import PropTypes from "prop-types";
import {Navigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Navbar from "./components/Navbar.jsx";
import Home from './Home.jsx'
import About from './About.jsx'
import FetchedProfiles from './fetched-profiles.jsx'
import NotFound from "./NotFound.jsx";
import AddProfiles from "./AddProfiles.jsx";
import ProfileDetail from "./ProfileDetail.jsx";

function SubPage(modeToggle) {
    const { page, id } = useParams();
    function chooseSubpage() {
        switch(page) {
            case "Home":
                return <Home modeToggle={modeToggle}/>
            case "About":
                return <About modeToggle={modeToggle}/>
            case "fetched-profiles":
                if (id !== undefined && !Number.isNaN(id)) {
                    return <ProfileDetail modeToggle={modeToggle} id={id}/>;
                }
                else{
                    return <FetchedProfiles modeToggle={modeToggle}/>
                }
            case "AddProfiles":
                return <AddProfiles modeToggle={modeToggle}/>
            default:
                return <Navigate to="/profile-app-fixed/notFound"/>
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
    innerPage: PropTypes.string,
	modeToggle: PropTypes.bool
}

export default SubPage;
