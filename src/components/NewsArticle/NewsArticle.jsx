import React from "react";
import './NewsArticle.scss';

const NewsArticle = ({article})=>{
    return(
        <div className="news-article">
            <img src={article.urlToImage} alt={"Image"} className="article-image" />

            <div className="content">
                <span className="title">short by {article.title}</span>
                <span className="author-time">{article.author}</span>
                <p className="description">{article.description}</p>
                <span className="source">read more at {article.source.name}</span>
            </div>
        </div>
    )   
}

export default NewsArticle;