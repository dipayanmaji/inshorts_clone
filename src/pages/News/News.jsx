import React, { useEffect, useState } from "react";
import './News.scss';
import axios from "axios";
import NewsArticle from "../../components/NewsArticle/NewsArticle";
import loading from '../../utilities/images/loading.gif';

let totalArticles;
let pageNum;

const News = ({ category, title }) => {
    const [articles, setArticles] = useState([]);
    const [displayLoadMore, setDisplayLoadMore] = useState(true);
    const [loader, setLoader] = useState(true);
    const [lodingBtn, setLodingBtn] = useState(false);

    const apiCall = async () => {
        const result = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${pageNum}&apiKey=900c811be75045699cf8f0ace6a1a035`);
        // console.log(result.data);
        totalArticles = result.data.totalResults;
        setArticles(result.data.articles);
        setLoader(false);
    }

    useEffect(() => {
        pageNum = 1;
        apiCall();
        document.title = title + " News || Inshorts Clone";
        window.scrollTo(0, 0);

        window.history.replaceState(null, '', category);
    }, [])

    const loadMoreArticles = async () => {
        setLodingBtn(true);
        pageNum += 1;
        const result = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${pageNum}&apiKey=900c811be75045699cf8f0ace6a1a035`);
        console.log(result.data);
        setArticles([...articles, ...result.data.articles]);

        if (pageNum * 20 >= totalArticles) setDisplayLoadMore(false); // we get 20 articles in each api call
        setLodingBtn(false);
    }

    return (
        <div className="news">
            {
                loader ? <img src={loading} alt="Loading" className="loader" />
                    :
                    <>
                        <div className="articles">
                            {
                                articles.map((article, index) => {
                                    return article.urlToImage && <NewsArticle key={index} article={article} />
                                })
                            }
                        </div>

                        {
                            lodingBtn ? <img src={loading} alt="Loading" className="btn-loader" />
                            :
                            displayLoadMore && <button className="load-more" onClick={loadMoreArticles}>Load More</button>
                        }
                    </>
            }
        </div>
    )
}

export default News;