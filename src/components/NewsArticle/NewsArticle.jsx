import React from "react";
import './NewsArticle.scss';
import { getDate } from "../../utilities/convertToDate";

const NewsArticle = ({ article, isMobileDevice, hideHeader, setHideHeader, height }) => {
    const { hours, minutes, meridiem, day, date, month, year } = getDate(article.publishedAt);
    const articleHandler = () => {
        if (isMobileDevice)
            setHideHeader(!hideHeader);
    }

    return (
        <div className={`news-article ${isMobileDevice && "mobile-news-article"}`} onClick={articleHandler} style={{height: isMobileDevice && height}}>
            <div style={{ backgroundImage: `url(${article.image})` }} className="article-image"></div>

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