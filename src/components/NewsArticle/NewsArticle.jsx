import React from "react";
import './NewsArticle.scss';
import { getDate } from "../../utilities/convertToDate";

const NewsArticle = ({ article }) => {
    const {hours, minutes, meridiem, day, date, month, year} = getDate(article.publishedAt);

    return (
        <div className="news-article">
            <div style={{ backgroundImage: `url(${article.image})` }} className="article-image"></div>

            <div className="content">
                <span className="title">{article.title}</span>
                <span className="author-time"><b>short</b> by {article.author} / {`${hours}:${minutes} ${meridiem} on ${day}, ${date} ${month}, ${year}`}</span>
                <p className="description">{article.description}</p>
                <span className="source">read more at <a href={article.url} target="_blank" className="name">{article.source.name}</a></span>
            </div>
        </div>
    )
}

export default NewsArticle;