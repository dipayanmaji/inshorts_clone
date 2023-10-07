import React, { useContext, useState } from "react";
import './MobileNav.scss';
import { NavLink } from "react-router-dom";
import { MyContext } from "../../CustomContext";
import topStories from '../../utilities/images/categories/top-stories.png';
import bookmarks from '../../utilities/images/categories/bookmarks.png';

import india from '../../utilities/images/categories/india.webp';
import international from '../../utilities/images/categories/international.webp';
import business from '../../utilities/images/categories/business.webp';
import entertainment from '../../utilities/images/categories/entertainment.webp';
import health from '../../utilities/images/categories/health.webp';
import science from '../../utilities/images/categories/science.webp';
import sports from '../../utilities/images/categories/sports.webp';
import technology from '../../utilities/images/categories/technology.webp';

const categories = [
    {
        english: "National",
        hindi: "भारत",
        imageUrl: india
    },
    {
        english: "International",
        hindi: "अंतरराष्ट्रीय",
        imageUrl: international
    },
    {
        english: "Business",
        hindi: "बिज़नेस",
        imageUrl: business
    },
    {
        english: "Entertainment",
        hindi: "मनोरंजन",
        imageUrl: entertainment
    },
    {
        english: "Health",
        hindi: "स्वास्थ्य",
        imageUrl: health
    },
    {
        english: "Science",
        hindi: "विज्ञान",
        imageUrl: science
    },
    {
        english: "Sports",
        hindi: "खेल",
        imageUrl: sports
    },
    {
        english: "Technology",
        hindi: "तकनीकी",
        imageUrl: technology
    }
];

const MobileNav = ({ mobileRef }) => {
    const [displayLanguage, setDisplayLanguage] = useState(false);

    const myContext = useContext(MyContext);
    const { language, setLanguage, currPath, windowHeight, sliderRef } = myContext;

    const languageHandler = (e) => {
        let newsLanguage = e.target.id;
        setLanguage(newsLanguage);
        localStorage.setItem("language", newsLanguage);
    }

    const sliderHandler = () => {
        sliderRef.current.slickGoTo(1);
    }

    return (
        <div className="mobile-nav" ref={mobileRef} style={{ height: windowHeight }}>
            <div className="top-header">
                <span className="heading">{language == "hi" ? "श्रेणियां एवं विषय" : "Categories and Topics"}</span>
                <div className="settings-back">
                    <div className="settings" onClick={() => setDisplayLanguage(!displayLanguage)}>
                        <i className="fa-solid fa-gear"></i>
                        {displayLanguage && <div className="language">
                            <NavLink to={`/en/${currPath}`} id="en" onClick={languageHandler}>English</NavLink>
                            <NavLink to={`/hi/${currPath}`} id="hi" onClick={languageHandler}>हिन्दी</NavLink>
                        </div>}
                    </div>
                    <i className="fa-solid fa-angle-right" onClick={sliderHandler}></i>
                </div>
            </div>

            <div className="categories">
                <span className="heading">{language == "hi" ? "श्रेणियां" : "CATEGORIES"}</span>
                <span className="underline"></span>
                <div className="items">
                    <NavLink to={`/${language}/general`} className="item">
                        <div className="image" style={{ backgroundImage: `url(${topStories})` }}></div>
                        <span className="name">{language == "hi" ? "ख़ास ख़बरें" : "TOP STORIES"}</span>
                    </NavLink>
                    <NavLink to={`/${language}/bookmarks`} className="item">
                        <div className="image" style={{ backgroundImage: `url(${bookmarks})` }}></div>
                        <span className="name">{language == "hi" ? "बुकमार्क" : "BOOKMARKS"}</span>
                    </NavLink>
                </div>
            </div>

            <div className="suggested-topics">
                <span className="heading">{language == "hi" ? "सुझाए गए विषय" : "SUGGESTED TOPICS"}</span>
                <span className="underline"></span>

                <div className="topics">
                    {
                        categories.map((category, index) => {
                            return <NavLink
                                className={"topic"}
                                key={index}
                                to={`/${language}/${category.english.toLocaleLowerCase()}`}
                                style={{ backgroundImage: `url(${category.imageUrl})` }}
                                onClick={sliderHandler}
                            >
                                {language == "hi" ? category.hindi : category.english == "National" ? "India" : category.english}
                            </NavLink>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MobileNav;