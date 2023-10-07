import { Route, Routes } from 'react-router';
import './App.css';
import News from './pages/News/News';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Slider from 'react-slick';
import { useContext, useRef } from 'react';
import { MyContext } from './CustomContext';
import MobileNav from './components/MobileNav/MobileNav';

function App() {
  const myContext = useContext(MyContext);
  const { isMobileDevice, sliderRef, windowHeight } = myContext;

  const sliderSettings = {
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
  }

  return (
    <div className="App">

      {isMobileDevice ?
        <Slider {...sliderSettings} ref={sliderRef}>
          <MobileNav />

          <Routes>
            <Route path={'/'} element={<News />} />
            <Route path={'/en/:category'} element={<News />} />
            <Route path={'/hi/:category'} element={<News />} />

            <Route path={'*'} element={<News />} />
          </Routes>
        </Slider>
        :
        <>
          <Header />
          <Routes>
            <Route path={'/'} element={<News />} />
            <Route path={'/en/:category'} element={<News />} />
            <Route path={'/hi/:category'} element={<News />} />

            <Route path={'*'} element={<News />} />
          </Routes>
          <Footer />
        </>
      }

    </div>
  );
}

export default App;
