import React, { useEffect, useState } from "react";
import './News.scss';
import axios from "axios";
import NewsArticle from "../../components/NewsArticle/NewsArticle";
import loading from '../../utilities/images/loading.gif';

let totalArticles;
let pageNum;

// get api key from https://newsapi.org/
// from one api key we can able to get 100 request per day
// api key 1 : 900c811be75045699cf8f0ace6a1a035
// api key 2 : 7d936a466bfc4fbfbfb051c0e694dd92
// const apiKey = "7d936a466bfc4fbfbfb051c0e694dd92";

const apiKey = "aa9c04bf0f87a6cb98e5baa034ac6998";

const News = ({ category, title }) => {
    const [articles, setArticles] = useState([]);
    const [displayLoadMore, setDisplayLoadMore] = useState(true);
    const [loader, setLoader] = useState(true);
    const [lodingBtn, setLodingBtn] = useState(false);

    const apiCall = async () => {
        const result = await axios.get(`https://gnews.io/api/v4/search?q=${category}&page=${pageNum}&lang=en&country=in&max=10&apikey=${apiKey}`);
        
        // const result = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${pageNum}&apiKey=${apiKey}`);
        // console.log(result.data);
        totalArticles = result.data.totalArticles;
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
        const result = await axios.get(`https://gnews.io/api/v4/search?q=${category}&page=${pageNum}&lang=en&country=in&max=10&apikey=${apiKey}`);
        // const result = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${pageNum}&apiKey=${apiKey}`);
        console.log(result.data);
        setArticles([...articles, ...result.data.articles]);

        if (pageNum * 10 >= totalArticles) setDisplayLoadMore(false); // we get 10 articles in each api call
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
                                    return <NewsArticle key={index} article={article} />
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