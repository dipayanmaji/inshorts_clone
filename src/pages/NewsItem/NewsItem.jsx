import React from "react";
import './NewsItem.scss';
import NewsArticle from "../../components/NewsArticle/NewsArticle";

const NewsItem = ({ article }) => {
    return (
        <div className="news-item">
            <NewsArticle article={article} />
        </div>
    )
}

export default NewsItem;