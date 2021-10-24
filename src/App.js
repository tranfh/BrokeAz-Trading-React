import './App.css';
import React, { useEffect } from 'react';
import Navigation from './components/Navigation/Navigation';
import Movers from './components/Movers/Movers';
import Futures from './components/Futures/Futures';
import News from './components/News/News';
import Trending from './components/Trending/Trending';
import Actives from './components/Actives/Actives';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App bg-dark">
      <Navigation />
      <Futures />
      <Actives />
      <Movers />
      <Trending />
      <News />
    </div>
  );
};

export default App;
