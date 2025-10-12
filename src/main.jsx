import {StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import NotFound from "./NotFound.jsx";
import SubPage from "./SubPage.jsx";
import About from "./About.jsx";
import Navbar from "./components/Navbar.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
