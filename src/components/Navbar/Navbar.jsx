import React, { useContext, useEffect, useState } from "react";
import './Navbar.scss';
import { NavLink } from "react-router-dom";
import { MyContext } from "../../CustomContext";

const mainCategories = [
    {
        english: "National",
        hindi: "भारत"
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

const Navbar = ({ displayNavbar, setDisplayNavbar }) => {
    const [categories, setCategories] = useState(mainCategories);

    const myContext = useContext(MyContext);
    const { language, setLanguage, currPath } = myContext;

    const categoryClicked = () => {
        setDisplayNavbar(false);
    }

    const languageHandler = (e) => {
        let newsLanguage = e.target.id;
        setLanguage(newsLanguage);
        localStorage.setItem("language", newsLanguage);
        setDisplayNavbar(false);
    }

    useEffect(() => {
        let updateCategories = [];
        if (language === 'hi') {
            updateCategories = mainCategories.filter((category) => category.english !== "National");
        }
        else {
            updateCategories = mainCategories;
        }
        setCategories(updateCategories);

    }, [language])

    return (
        <div className={`navbar ${!displayNavbar && "close-navbar"}`}>
            <div className="language">
                <NavLink to={`/en/${currPath}`} id="en" onClick={languageHandler}>English</NavLink>
                <NavLink to={`/hi/${currPath}`} id="hi" onClick={languageHandler}>हिन्दी</NavLink>
            </div>

            <hr />

            <span className="nav-heading">{language == "hi" ? "श्रेणियां" : "Categories"}</span>

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