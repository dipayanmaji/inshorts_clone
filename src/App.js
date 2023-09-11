import { Route, Routes } from 'react-router';
import './App.css';
import News from './pages/News/News';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<News category="general" />} />
        <Route path='/business' element={<News category="business" />} />
        <Route path='/entertainment' element={<News category="entertainment" />} />
        <Route path='/health' element={<News category="health" />} />
        <Route path='/science' element={<News category="science" />} />
        <Route path='/sports' element={<News category="sports" />} />
        <Route path='/technology' element={<News category="technology" />} />
      </Routes>
    </div>
  );
}

export default App;
