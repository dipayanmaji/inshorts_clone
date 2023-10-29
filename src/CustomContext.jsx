import React, { createContext, useEffect, useRef, useState } from "react";

export const MyContext = createContext();

const MyContextProvider = (props) => {
    const [language, setLanguage] = useState(localStorage.getItem("language") ? localStorage.getItem("language") : "en");
    const [currPath, setCurrPath] = useState("/");
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);
    const [articles, setArticles] = useState([]);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const sliderRef = useRef();
    const [hindiBookmarkArticles, setHindiBookmarkArticlesHandler] = useState(localStorage.getItem('bookmarksHindi') ? JSON.parse(localStorage.getItem('bookmarksHindi')) : []);
    const [englishBookmarkArticles, setEnglishBookmarkArticlesHandler] = useState(localStorage.getItem('bookmarksEnglish') ? JSON.parse(localStorage.getItem('bookmarksEnglish')) : []);


    // Determind that site is open on a mobile device or a desktop.
    const mobileDeviceHandler = () => {
        const details = navigator.userAgent;
        const regexp = /android|iphone|kindle|ipad/i;
        const mobileDevice = regexp.test(details);
        if (mobileDevice) {
            setIsMobileDevice(true);
        } else {
            setIsMobileDevice(false);
            setHideHeader(false);
        }
    }

    window.addEventListener('resize', () => {
        setWindowHeight(window.innerHeight);
        mobileDeviceHandler();
    })

    const setHindiBookmarkArticles = (articlesArr) => {
        setHindiBookmarkArticlesHandler(articlesArr);
        localStorage.setItem('bookmarksHindi', JSON.stringify(articlesArr))
    }

    const setEnglishBookmarkArticles = (articlesArr) => {
        setEnglishBookmarkArticlesHandler(articlesArr);
        localStorage.setItem('bookmarksEnglish', JSON.stringify(articlesArr))
    }

    useEffect(() => {
        mobileDeviceHandler();
    }, [])

    const value = {
        language, setLanguage,
        currPath, setCurrPath,
        isMobileDevice,
        hideHeader, setHideHeader,
        articles, setArticles,
        windowHeight,
        sliderRef,
        hindiBookmarkArticles, setHindiBookmarkArticles,
        englishBookmarkArticles, setEnglishBookmarkArticles
    }

    return (
        <MyContext.Provider value={value}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyContextProvider;