import React from "react";
import './Navbar.scss';
import { NavLink, useParams } from "react-router-dom";
const categories = [
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

const Navbar = ({ displayNavbar, setDisplayNavbar, language, setLanguage, currPath }) => {

    const categoryClicked = () => {
        setDisplayNavbar(false);
    }
    const params = useParams();

    const languageHandler = (e) => {
        setLanguage(language == "en" ? "hi" : "en");
        setDisplayNavbar(false);
    }

    return (
        <div className={`navbar ${!displayNavbar && "close-navbar"}`}>
            <div className="language">
                <NavLink to={`/en/${currPath}`} className="english" onClick={languageHandler}>English</NavLink>
                <NavLink to={`/hi/${currPath}`} className="hindi" onClick={languageHandler}>हिन्दी</NavLink>
            </div>

            <hr />

            <span className="nav-heading">Categories</span>

            <div className="categories">
                {
                    categories.map((category, index) => {
                        return <NavLink
                            key={index}
                            to={`/${language}/${category.english.toLocaleLowerCase()}`}
                            onClick={categoryClicked}
                        >
                            {language == "hi" ? category.hindi : category.english == "National" ? "India" : category.english}
                        </NavLink>
                    })
                }
            </div>
        </div>
    )
}

export default Navbar;