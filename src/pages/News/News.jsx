import React, { useEffect, useState } from "react";
import './News.scss';
import Header from "../../components/Header/Header";
import axios from "axios";
import NewsArticle from "../../components/NewsArticle/NewsArticle";

const News = ({category}) => {

    const [articles, setArticles] = useState([]);

    const apiCall = async () => {
        let pageNum = 1;
        const result = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${pageNum}&apiKey=900c811be75045699cf8f0ace6a1a035`);
        console.log(result.data);
        setArticles(result.data.articles);
    }

    useEffect(() => {
        apiCall();
    }, [])

    return (
        <div className="news">
            <Header />

            <div className="articles">
                {
                    articles.map((article, index)=>
                        <NewsArticle article={article} />
                    )
                }
            </div>

        </div>
    )
}

export default News;