import React, { useState } from "react";
import './Header.scss';
import { Link } from "react-router-dom";
import logo from '../../utilities/images/inshorts-logo-black.png'
import Navbar from "../Navbar/Navbar";

const Header = () => {
    const [displayNavbar, setDisplayNavbar] = useState(false);
    return (
        <header className="header">

            <div className={`nav-menu ${displayNavbar && "close-nav-menu"}`} >
                <Navbar displayNavbar={displayNavbar} setDisplayNavbar={setDisplayNavbar} />

                <div className={`menu-container`} onClick={() => setDisplayNavbar(!displayNavbar)}>
                    <div className={`bar-container ${displayNavbar && "close-bar-container"}`}>
                        <span className="bar-line"></span>
                        <span className="bar-line"></span>
                        <span className="bar-line"></span>
                    </div>
                    {!displayNavbar ? "Menu" : "Close"}
                </div>
            </div>

            <Link to={'/'} className="logo">
                <img src={logo} alt="Inshorts Clone" />
            </Link>
        </header>
    )
}

export default Header;