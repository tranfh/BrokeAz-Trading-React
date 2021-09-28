import './App.css';
import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import StockChart from './components/Chart/StockChart';
import FinancialDetails from './components/FinancialDetails/FinancialDetails';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="App flex">
        <Navigation />
        <div className="flex">
          <StockChart />
          <FinancialDetails />
        </div>
      </div>
    );
  }
}

export default App;
