import React, { useContext, useEffect, useState } from "react";
import './News.scss';
import axios from "axios";
import NewsArticle from "../../components/NewsArticle/NewsArticle";
import loading from '../../utilities/images/loading.gif';
import { useNavigate, useParams } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MyContext } from "../../CustomContext";

const validQuaries = ["general", "national", "international", "business", "entertainment", "health", "science", "sports", "technology"];
let totalArticles;
let pageNum;

// get apikey from https://gnews.io/
// for one apikey we can able to send 100 request per day
let apiKey = "aa9c04bf0f87a6cb98e5baa034ac6998";

const News = () => {
    const [displayLoadMore, setDisplayLoadMore] = useState(true);
    const [loader, setLoader] = useState(true);
    const [lodingBtn, setLodingBtn] = useState(false);
    const [networkErr, setNetworkErr] = useState(false);

    const myContext = useContext(MyContext);
    const { language, setCurrPath, isMobileDevice, setHideHeader, articles, setArticles, windowHeight } = myContext;

    const navigate = useNavigate();
    const params = useParams();
    let category = params.category;

    if (category == "national" || category == "international") {
        category = "general";
    }

    const apiCall = async () => {
        setLoader(true);
        setNetworkErr(false);
        let result;
        try {
            result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
            // as I use a free api now, that's why the 'page' quary not valid here. Still I use it by thinking that I have a paid api.
        }
        catch (err) {
            // when the per apikey's validity is expired then use another apikey through try-catch method
            console.log("expired 1st apikey");
            try {
                apiKey = "239eafb61b40e1419a2bcd08e20492f7";
                result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
            }
            catch (err2) {
                console.log("expired 2nd apikey");
                try {
                    apiKey = "743d722dd292a77769e54e8d6aeb5475";
                    result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
                }
                catch (err3) {
                    console.log("expired 3rd apikey");
                    try {
                        apiKey = "606ac7501ef2bd39836d80bceb5f32ec";
                        result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
                    }
                    catch (err4) {
                        console.log("expired 4th apikey");
                        try {
                            apiKey = "611a1fcfe8a977c10b329207423901ff";
                            result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
                        }
                        catch (err4) {
                            console.log("expired 5th apikey");
                            if (err4.message === "Network Error") {
                                setNetworkErr(true);
                            }
                        }
                    }
                }
            }
        }

        totalArticles = result?.data.totalArticles;
        setArticles(result?.data.articles);
        setLoader(false);
    }

    useEffect(() => {
        if (params.category == undefined || !validQuaries.includes(params.category)) {
            navigate(`/${language}/general`);
        }
        else {
            setCurrPath(params.category);
            pageNum = 1;
            apiCall();
            document.title = (params.category == "general" ? "TOP HEADLINES" : params.category.toLocaleUpperCase()) + " NEWS || INSHORTS CLONE";
            window.scrollTo(0, 0);
        }
    }, [params.category, language])

    const loadMoreArticles = async () => {
        setLodingBtn(true);
        pageNum += 1;
        try {
            const result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
            setArticles([...articles, ...result.data.articles]);
        } catch (err) {
            console.log("apikey validity expired");
        }

        if (pageNum * 10 >= totalArticles) setDisplayLoadMore(false); // we get 10 articles in each api call
        setLodingBtn(false);
    }

    const slideScrollHandler = (oldIndex, newIndex) => {
        if (oldIndex > newIndex) {
            setHideHeader(false);
        }
        else {
            setHideHeader(true);
        }
    }

    const sliderSettings = {
        infinite: false,
        vertical: true,
        verticalSwiping: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: slideScrollHandler,
    }

    return (
        <div className={`news ${isMobileDevice && "mobile-news"}`} style={{ height: isMobileDevice && windowHeight }}>
            {
                loader ? <img src={loading} alt="Loading" className="loader" />
                    :
                    networkErr ? <span className="network-err">Check your internet connection and try again.</span>
                        :
                        isMobileDevice ?
                            <Slider  {...sliderSettings} className="articles">
                                {
                                    articles.map((article, index) => {
                                        return <NewsArticle key={index} article={article} />
                                    })
                                }
                            </Slider>
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