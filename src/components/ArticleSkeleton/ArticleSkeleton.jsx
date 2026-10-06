import React, { useContext } from "react";
import './ArticleSkeleton.scss';
import { MyContext } from "../../CustomContext";

const ArticleSkeleton = ({ count = 3 }) => {
    const myContext = useContext(MyContext);
    const { isMobileDevice, windowHeight } = myContext;

    // on mobile only one article is visible at a time
    const total = isMobileDevice ? 1 : count;

    return (
        <div className={`articles-skeleton ${isMobileDevice && "mobile-articles-skeleton"}`} aria-busy="true" aria-label="Loading news">
            {
                Array.from({ length: total }).map((_, index) => {
                    return (
                        <div key={index} className={`news-article skeleton-article ${isMobileDevice && "mobile-news-article"}`} style={{ height: isMobileDevice && windowHeight }}>
                            <div className="skeleton skeleton-image"></div>

                            <div className="content">
                                <div className="skeleton skeleton-line skeleton-title"></div>
                                <div className="skeleton skeleton-line skeleton-title short"></div>
                                <div className="skeleton skeleton-line skeleton-meta"></div>
                                <div className="skeleton skeleton-line"></div>
                                <div className="skeleton skeleton-line"></div>
                                <div className="skeleton skeleton-line"></div>
                                <div className="skeleton skeleton-line short"></div>
                            </div>

                            {isMobileDevice && <div className="skeleton skeleton-bottom"></div>}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ArticleSkeleton;
