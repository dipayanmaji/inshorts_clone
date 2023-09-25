import { Route, Routes } from 'react-router';
import './App.css';
import News from './pages/News/News';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
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
