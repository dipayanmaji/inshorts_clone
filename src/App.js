import { Route, Routes } from 'react-router';
import './App.css';
import News from './pages/News/News';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react';

function App() {
  const [language, setLanguage] = useState(localStorage.getItem("language") ? localStorage.getItem("language") : "en");
  const [currPath, setCurrPath] = useState("/");
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

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
      <Header language={language} setLanguage={setLanguage} currPath={currPath} isMobileDevice={isMobileDevice} hideHeader={hideHeader} />

      <Routes>
        <Route path={'/'} element={<News language={language} setCurrPath={setCurrPath} isMobileDevice={isMobileDevice} hideHeader={hideHeader} setHideHeader={setHideHeader} />} />
        <Route path={'/en/:category'} element={<News language={language} setCurrPath={setCurrPath} isMobileDevice={isMobileDevice} hideHeader={hideHeader} setHideHeader={setHideHeader} />} />
        <Route path={'/hi/:category'} element={<News language={language} setCurrPath={setCurrPath} isMobileDevice={isMobileDevice} hideHeader={hideHeader} setHideHeader={setHideHeader} />} />

        <Route path={'*'} element={<News language={language} setCurrPath={setCurrPath} isMobileDevice={isMobileDevice} hideHeader={hideHeader} setHideHeader={setHideHeader} />} />
      </Routes>

      <Footer isMobileDevice={isMobileDevice} hideHeader={hideHeader} />
    </div>
  );
}

export default App;
