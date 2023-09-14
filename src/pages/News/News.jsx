import React, { useEffect, useState } from "react";
import './News.scss';
import axios from "axios";
import NewsArticle from "../../components/NewsArticle/NewsArticle";
import loading from '../../utilities/images/loading.gif';
import { useParams } from "react-router";

let totalArticles;
let pageNum;

// get api key from https://newsapi.org/
// from one api key we can able to get 100 request per day
// api key 1 : 900c811be75045699cf8f0ace6a1a035
// api key 2 : 7d936a466bfc4fbfbfb051c0e694dd92
// const apiKey = "7d936a466bfc4fbfbfb051c0e694dd92";

// get api key from https://gnews.io/
// from one api key we can able to get 100 request per day
// const apiKey = "aa9c04bf0f87a6cb98e5baa034ac6998";
// const apiKey = "239eafb61b40e1419a2bcd08e20492f7";
const apiKey = "743d722dd292a77769e54e8d6aeb5475";

const News = ({language, setCurrPath}) => {
    const [articles, setArticles] = useState([]);
    const [displayLoadMore, setDisplayLoadMore] = useState(true);
    const [loader, setLoader] = useState(true);
    const [lodingBtn, setLodingBtn] = useState(false);
    const params = useParams();
    let category = params.category;

    if(category == "national" || category == "international"){
        category = "general";
    }

    const apiCall = async () => {
        setLoader(true);
        const result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
        
        totalArticles = result.data.totalArticles;
        setArticles(result.data.articles);
        setLoader(false);
    }

    useEffect(() => {
        setCurrPath(params.category);
        pageNum = 1;
        apiCall();
        document.title = params.category == "general" ? "TOP HEADLINES" : params.category.toLocaleUpperCase() + " NEWS || INSHORTS CLONE";
        window.scrollTo(0, 0);

        // window.history.replaceState(null, '', category == "general" ? "" : category == "world" ? "international" : category);
    }, [params.category, language])

    const loadMoreArticles = async () => {
        setLodingBtn(true);
        pageNum += 1;
        const result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
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