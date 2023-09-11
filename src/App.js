import { Route, Routes } from 'react-router';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  const apiCall = async () => {
    const result = await axios.get('https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=900c811be75045699cf8f0ace6a1a035');
    console.log(result.data);
  }

  useEffect(() => {
    apiCall();
  }, [])

  return (
    <div className="App">
      <Routes>
      </Routes>
    </div>
  );
}

export default App;
