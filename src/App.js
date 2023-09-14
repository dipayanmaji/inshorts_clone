import { Route, Routes } from 'react-router';
import './App.css';
import News from './pages/News/News';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useState } from 'react';

function App() {
  const [language, setLanguage] = useState(localStorage.getItem("language") ? localStorage.getItem("language") : "en");
  const [currPath, setCurrPath] = useState("/");

  return (
    <div className="App">
      <Header language={language} setLanguage={setLanguage} currPath={currPath} setCurrPath={setCurrPath} />

      <Routes>
        <Route path={'/'} element={<News language={language} setCurrPath={setCurrPath} />} />
        <Route path={'/en/:category'} element={<News language={language} setCurrPath={setCurrPath} />} />
        <Route path={'/hi/:category'} element={<News language={language} setCurrPath={setCurrPath} />} />

        <Route path={'*'} element={<News language={language} setCurrPath={setCurrPath} />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
