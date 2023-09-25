import React, { createContext, useState } from "react";

export const MyContext = createContext();

const MyContextProvider = (props) => {
    const [language, setLanguage] = useState(localStorage.getItem("language") ? localStorage.getItem("language") : "en");
    const [currPath, setCurrPath] = useState("/");
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);

    const [articles, setArticles] = useState([]);
    const [height, setHeight] = useState(window.innerHeight);

    const value = {
        language, setLanguage,
        currPath, setCurrPath,
        isMobileDevice, setIsMobileDevice,
        hideHeader, setHideHeader,
        articles, setArticles,
        height
    }

    window.addEventListener('resize', () => {
        setHeight(window.innerHeight);
    })

    return (
        <MyContext.Provider value={value}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyContextProvider;