import React from "react";
import './Navbar.scss';
import { NavLink } from "react-router-dom";

const Navbar = ({displayNavbar, setDisplayNavbar})=>{

    const categoryClicked = ()=>{
        setDisplayNavbar(false);
    }

    return(
        <div className={`navbar ${!displayNavbar && "close-navbar"}`}>
            <span className="nav-heading">Categories</span>
            <div className="categories">
                <NavLink to={'/'} onClick={categoryClicked}>General</NavLink>
                <NavLink to={'/business'} onClick={categoryClicked}>Business</NavLink>
                <NavLink to={'/entertainment'} onClick={categoryClicked}>Entertainment</NavLink>
                <NavLink to={'/health'} onClick={categoryClicked}>Health</NavLink>
                <NavLink to={'/science'} onClick={categoryClicked}>Science</NavLink>
                <NavLink to={'/sports'} onClick={categoryClicked}>Sports</NavLink>
                <NavLink to={'/technology'} onClick={categoryClicked}>Technology</NavLink>
            </div>
        </div>
    )
}

export default Navbar;