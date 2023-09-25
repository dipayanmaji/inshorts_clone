import { Route, Routes } from 'react-router';
import './App.css';
import News from './pages/News/News';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useContext, useEffect } from 'react';
import { MyContext } from './CustomContext';

function App() {
  const myContext = useContext(MyContext);
  const { setIsMobileDevice } = myContext;

  // Determind that site is open on a mobile device or a desktop.
  useEffect(() => {
    const details = navigator.userAgent;
    const regexp = /android|iphone|kindle|ipad/i;
    const mobileDevice = regexp.test(details);
    if (mobileDevice) {
      setIsMobileDevice(true);
    } else {
      setIsMobileDevice(false);
    }
  }, [])

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path={'/'} element={<News />} />
        <Route path={'/en/:category'} element={<News />} />
        <Route path={'/hi/:category'} element={<News />} />

        <Route path={'*'} element={<News />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
