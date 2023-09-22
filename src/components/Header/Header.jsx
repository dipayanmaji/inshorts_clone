import React, { useState } from "react";
import './Header.scss';
import { Link } from "react-router-dom";
import logo from '../../utilities/images/inshorts-logo-black.png'
import Navbar from "../Navbar/Navbar";

const Header = ({ language, setLanguage, currPath, isMobileDevice, hideHeader }) => {
    const [displayNavbar, setDisplayNavbar] = useState(false);

    return (
        <header className={`header ${isMobileDevice && "mobile-header"} ${hideHeader && "hide-header"}`}>

            <div className={`nav-menu ${displayNavbar && "close-nav-menu"}`} >
                <Navbar
                    displayNavbar={displayNavbar}
                    setDisplayNavbar={setDisplayNavbar}
                    language={language}
                    setLanguage={setLanguage}
                    currPath={currPath}
                />

                <div className={`menu-container`} onClick={() => setDisplayNavbar(!displayNavbar)}>
                    <div className={`bar-container ${displayNavbar && "close-bar-container"}`}>
                        <span className="bar-line"></span>
                        <span className="bar-line"></span>
                        <span className="bar-line"></span>
                    </div>
                    {!displayNavbar ? "Menu" : "Close"}
                </div>
            </div>

            <Link to={`${language}/general`} className="logo" onClick={() => setDisplayNavbar(false)}>
                <img src={logo} alt="Inshorts Clone" />
            </Link>
        </header>
    )
}

export default Header;