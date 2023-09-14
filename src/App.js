import { Route, Routes, useNavigate, useParams } from 'react-router';
import './App.css';
import News from './pages/News/News';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react';

function App() {
  const [language, setLanguage] = useState("en");
  const [currPath, setCurrPath] = useState("/");
  const navigate = useNavigate();

  useEffect(()=>{
    navigate('/en/general');
  }, []);

  return (
    <div className="App">
      <Header language={language} setLanguage={setLanguage} currPath={currPath} setCurrPath={setCurrPath} />

      <Routes>
        <Route path={`/${language}/:category`} element={<News key={""} language={language} setCurrPath={setCurrPath} />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
