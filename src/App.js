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
        <Route path='/' element={<News key={"general"} category="general" title="General" />} />
        <Route path='/business' element={<News key={"business"} category="business" title="Business" />} />
        <Route path='/entertainment' element={<News key={"entertainment"} category="entertainment" title="Entertainment" />} />
        <Route path='/health' element={<News key={"health"} category="health" title="Health" />} />
        <Route path='/science' element={<News key={"science"} category="science" title="Science" />} />
        <Route path='/sports' element={<News key={"sports"} category="sports" title="Sports" />} />
        <Route path='/technology' element={<News key={"technology"} category="technology" title="Technology" />} />
        <Route path='*' element={<News key={"general"} category="general" title="General" />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
