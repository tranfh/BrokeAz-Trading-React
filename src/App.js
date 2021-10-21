import './App.css';
import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
// import StockChart from './components/Chart/StockChart';
import Futures from './components/Futures/Futures';
import News from './components/News/News';
import Trending from './components/Trending/Trending';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="App bg-dark">
        <Navigation />
        <Futures />
        <Trending />
        <News />
      </div>
    );
  }
}

export default App;
