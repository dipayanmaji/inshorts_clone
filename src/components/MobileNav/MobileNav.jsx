import React from "react";
import './MobileNav.scss';
import topStories from '../../utilities/images/categories/top-stories.png';
import bookmarks from '../../utilities/images/categories/bookmarks.png';

const MobileNav = () => {
    return (
        <div className="mobile-nav">
            <div className="top-header">
                <span className="heading">Categories and Topics</span>
                <div className="settings">
                    <i className="fa-solid fa-gear"></i>
                    <i className="fa-solid fa-angle-right"></i>
                </div>
            </div>

            <div className="categories">
                <span className="heading">CATEGORIES</span>
                <div className="items">
                    <div className="item">
                        <div className="image" style={{backgroundImage: `url(${topStories})`}}></div>
                        <span className="name">TOP STORIES</span>
                    </div>
                    <div className="item">
                        <div className="image" style={{backgroundImage: `url(${bookmarks})`}}></div>
                        {/* <img src={bookmarks} alt="Bookmarks" /> */}
                        <span className="name">BOOKMARKS</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileNav;