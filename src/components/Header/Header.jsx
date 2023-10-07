import React, { useContext, useState } from "react";
import './Header.scss';
import { Link } from "react-router-dom";
import logo from '../../utilities/images/inshorts-logo-black.png'
import Navbar from "../Navbar/Navbar";
import { MyContext } from "../../CustomContext";

const categories = [
    {
        english: "General",
        hindi: "ख़ास ख़बरें"
    },
    {
        english: "National",
        hindi: "भारत"
    },
    {
        english: "International",
        hindi: "अंतरराष्ट्रीय"
    },
    {
        english: "Business",
        hindi: "बिज़नेस"
    },
    {
        english: "Entertainment",
        hindi: "मनोरंजन"
    },
    {
        english: "Health",
        hindi: "स्वास्थ्य"
    },
    {
        english: "Science",
        hindi: "विज्ञान"
    },
    {
        english: "Sports",
        hindi: "खेल"
    },
    {
        english: "Technology",
        hindi: "तकनीकी"
    }
];

const Header = () => {
    const [displayNavbar, setDisplayNavbar] = useState(false);

    const myContext = useContext(MyContext);
    const { currPath, language, isMobileDevice, hideHeader, sliderRef } = myContext;

    const menuHandler = () => {
        if (isMobileDevice) {
            sliderRef.current.slickGoTo(0);
        }
        else {
            setDisplayNavbar(!displayNavbar);
        }
    }

    return (
        <header className={`header ${isMobileDevice && "mobile-header"} ${hideHeader && "hide-header"}`}>

            <div className={`nav-menu ${displayNavbar && "close-nav-menu"}`} >
                <Navbar
                    displayNavbar={displayNavbar}
                    setDisplayNavbar={setDisplayNavbar}
                />

                <div className={`menu-container`} onClick={menuHandler}>
                    <div className={`bar-container ${displayNavbar && "close-bar-container"}`}>
                        <span className="bar-line"></span>
                        <span className="bar-line"></span>
                        <span className="bar-line"></span>
                    </div>
                    {
                        isMobileDevice ?
                            language == "hi" ? categories.filter((category) => category.english.toLocaleLowerCase() == currPath)[0]?.hindi
                                :
                                currPath == "general" ? "TOP STORIES" : currPath.toLocaleUpperCase()
                            :
                            !displayNavbar ? "Menu" : "Close"
                    }
                </div>
            </div>

            <Link to={`${language}/general`} className="logo" onClick={() => setDisplayNavbar(false)}>
                <img src={logo} alt="Inshorts Clone" />
            </Link>
        </header>
    )
}

export default Header;