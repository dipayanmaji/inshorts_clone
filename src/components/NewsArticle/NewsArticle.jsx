import React, { useContext } from "react";
import './NewsArticle.scss';
import { getDate } from "../../utilities/convertToDate";
import { MyContext } from "../../CustomContext";
import { BackgroundImage } from "react-image-and-background-image-fade";

const NewsArticle = ({ article }) => {
    const myContext = useContext(MyContext);
    const { isMobileDevice, hideHeader, setHideHeader, windowHeight } = myContext;

    const { hours, minutes, meridiem, day, date, month, year } = getDate(article.publishedAt);

    const articleHandler = () => {
        if (isMobileDevice)
            setHideHeader(!hideHeader);
    }

    return (
        <div className={`news-article ${isMobileDevice && "mobile-news-article"}`} onClick={articleHandler} style={{ height: isMobileDevice && windowHeight }}>
            {/* <div style={{ backgroundImage: `url(${article.image})` }} className="article-image"></div> */}
            <BackgroundImage
                className={"article-image"}
                src={article.image}
                lazyLoad
            />

            <div className="content">
                <span className="title">{article.title}</span>
                <span className="author-time"><b>short</b> by {article.source.name} / {`${hours}:${minutes} ${meridiem} on ${day}, ${date} ${month}, ${year}`}</span>
                <p className="description">{article.description}</p>
                <span className="source">read more at <a href={article.url} target="_blank" className="name">{article.source.name}</a></span>
            </div>

            {isMobileDevice && <span className="bottom-section">To see the full image <br />
                <a href={article.image} target="_blank" className="image-link">Tap here</a>
            </span>}
        </div>
    )
}

export default NewsArticle;