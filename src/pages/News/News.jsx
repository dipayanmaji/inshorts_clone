import React, { useContext, useEffect, useState } from "react";
import './News.scss';
import axios from "axios";
import NewsArticle from "../../components/NewsArticle/NewsArticle";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MyContext } from "../../CustomContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner";
import ArticleSkeleton from "../../components/ArticleSkeleton/ArticleSkeleton";

const validQuaries = ["general", "national", "international", "business", "entertainment", "health", "science", "sports", "technology", "bookmarks"];
let totalArticles;
let pageNum;

let timeOut;
const API_URL = "https://gnews-proxy.onrender.com/api/news";
// get apikey from https://gnews.io/
// for one apikey we can able to send 100 request per day
// when one apikey's validity is expired then the next one is used
const apiKeys = [
    "aa9c04bf0f87a6cb98e5baa034ac6998",
    "239eafb61b40e1419a2bcd08e20492f7",
    "743d722dd292a77769e54e8d6aeb5475",
    "606ac7501ef2bd39836d80bceb5f32ec",
    "611a1fcfe8a977c10b329207423901ff"
];
let apiKeyIndex = 0;
// every new category/language load gets a new id, so a late response of an old request can be ignored
let latestRequestId = 0;

// as I use a free api now, that's why the 'page' quary not valid here. Still I use it by thinking that I have a paid api.
const fetchNews = async (newsParams) => {
    let lastErr;
    for (let i = 0; i < apiKeys.length; i++) {
        const keyIndex = (apiKeyIndex + i) % apiKeys.length;
        try {
            const result = await axios.get(API_URL, { params: { ...newsParams, apiKey: apiKeys[keyIndex] } });
            apiKeyIndex = keyIndex;
            return result;
        }
        catch (err) {
            console.log(`expired apikey ${keyIndex + 1}`);
            lastErr = err;
        }
    }
    throw lastErr;
}

// last fetched news of every category are saved, so they can be shown instantly while the server wakes up
const getCachedNews = (cacheKey) => {
    try {
        return JSON.parse(localStorage.getItem(cacheKey));
    } catch (err) {
        return null;
    }
}

const setCachedNews = (cacheKey, news) => {
    try {
        localStorage.setItem(cacheKey, JSON.stringify(news));
    } catch (err) {
        // storage full or blocked, caching is optional
    }
}

const News = () => {
    const [displayLoadMore, setDisplayLoadMore] = useState(true);
    const [loader, setLoader] = useState(true);
    const [lodingBtn, setLodingBtn] = useState(false);
    const [networkErr, setNetworkErr] = useState(false);
    const [bookmarkMsg, setBookmarkMsg] = useState("News Bookmarked");
    const [displayBookmarkMsg, setDisplayBookmarkMsg] = useState(false);
    const [slowServer, setSlowServer] = useState(false);

    const bookmarkMsgHandler = (message) => {
        setBookmarkMsg(message);
        setDisplayBookmarkMsg(true);

        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            setDisplayBookmarkMsg(false);
        }, 3000);
    }

    const myContext = useContext(MyContext);
    const { language, setCurrPath, isMobileDevice, setHideHeader, articles, setArticles, windowHeight, hindiBookmarkArticles, englishBookmarkArticles } = myContext;

    const navigate = useNavigate();
    const params = useParams();
    let category = params.category;

    if (category === "national" || category === "international") {
        category = "general";
    }

    const newsParams = (page) => ({
        category,
        page,
        lang: language,
        country: params.category === "national" ? "in" : "any"
    });

    const apiCall = async () => {
        const requestId = ++latestRequestId;
        const cacheKey = `newsCache_${language}_${params.category}`;
        const cachedNews = getCachedNews(cacheKey);

        setNetworkErr(false);
        setSlowServer(false);
        setDisplayLoadMore(false);

        if (cachedNews) {
            totalArticles = cachedNews.totalArticles;
            setArticles(cachedNews.articles);
            setLoader(false);
        }
        else {
            setLoader(true);
        }

        // free render server sleeps when it is not used, the first request can take a while
        const slowServerTimer = setTimeout(() => {
            if (requestId === latestRequestId) setSlowServer(true);
        }, 4000);

        let result;
        try {
            result = await fetchNews(newsParams(pageNum));
        }
        catch (err) {
            if (requestId === latestRequestId && !cachedNews && err.message === "Network Error") {
                setNetworkErr(true);
            }
        }
        clearTimeout(slowServerTimer);

        if (requestId !== latestRequestId) return; // user already moved to another category or language
        setSlowServer(false);

        if (result) {
            totalArticles = result.data.totalArticles;
            setArticles(result.data.articles);
            setCachedNews(cacheKey, { articles: result.data.articles, totalArticles });
        }
        else if (!cachedNews) {
            setArticles([]);
        }
        setLoader(false);
        setDisplayLoadMore(pageNum * 10 < totalArticles); // we get 10 articles in each api call
    }

    useEffect(() => {
        setDisplayLoadMore(true);

        if (params.category === undefined || !validQuaries.includes(params.category)) {
            navigate(`/${language}/general`);
        }
        else if (params.category === 'bookmarks') {
            const bookmarksArticle = language === 'hi' ? hindiBookmarkArticles : englishBookmarkArticles;
            setLoader(true);
            setNetworkErr(false);
            setSlowServer(false);
            setDisplayLoadMore(false);

            const requestId = ++latestRequestId;
            setTimeout(() => {
                if (requestId !== latestRequestId) return;
                setArticles(bookmarksArticle);
                setLoader(false);
            }, 500);

            document.title = "BOOKMARKS NEWS || INSHORTS CLONE";
            setCurrPath(params.category);
        }
        else {
            pageNum = 1;
            apiCall();
            document.title = (params.category === "general" ? "TOP HEADLINES" : params.category.toLocaleUpperCase()) + " NEWS || INSHORTS CLONE";
            setCurrPath(params.category);
        }
        window.scrollTo(0, 0);
        setHideHeader(false);

        // only re-run when the category or language changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.category, language])

    const loadMoreArticles = async () => {
        const requestId = latestRequestId;
        setLodingBtn(true);
        pageNum += 1;
        try {
            const result = await fetchNews(newsParams(pageNum));
            if (requestId === latestRequestId) setArticles((prevArticles) => [...prevArticles, ...result.data.articles]);
        } catch (err) {
            console.log("apikey validity expired");
        }

        setLodingBtn(false);
        if (requestId !== latestRequestId) return;
        if (pageNum * 10 >= totalArticles) setDisplayLoadMore(false); // we get 10 articles in each api call
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
            {isMobileDevice && <Header />}
            {
                loader ?
                    <>
                        {slowServer && <span className="slow-server-msg">{language === 'hi' ? 'समाचार सर्वर शुरू हो रहा है, इसमें एक मिनट तक लग सकता है...' : 'Waking up the news server, this can take up to a minute...'}</span>}
                        <ArticleSkeleton />
                    </>
                    :
                    networkErr ? <span className="network-err">{language === 'hi' ? 'अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।' : 'Check your internet connection and try again.'}</span>
                        :
                        articles.length === 0 ?
                            <div className="bookmarks-err">
                                <p>{language === 'hi' ? 'कोई बुकमार्क समाचार उपलब्ध नहीं हैं' : 'No bookmark news are available'}</p>
                                <Link to={`${language}/general`}>Load News</Link>
                            </div>
                            :
                            isMobileDevice ?
                                <>
                                    <Slider {...sliderSettings} className="articles">
                                        {
                                            articles.map((article, index) => {
                                                return <NewsArticle key={index} article={article} bookmarkMsgHandler={bookmarkMsgHandler} />
                                            })
                                        }
                                    </Slider>

                                    <span className={`bookmark-message ${displayBookmarkMsg && 'd-item'}`}>{bookmarkMsg}</span>
                                </>
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
                                        lodingBtn ? <Spinner />
                                            :
                                            displayLoadMore && <button className="load-more" onClick={loadMoreArticles}>Load More</button>
                                    }
                                </>
            }
            {isMobileDevice && <Footer />}
        </div>
    )
}

export default News;
