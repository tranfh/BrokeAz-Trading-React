import './App.css';
import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Chart from './components/Chart/Chart';
import FinancialDetails from './components/FinancialDetails/FinancialDetails';
import SearchBox from './components/SearchBox';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchField: '',
    };
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
    console.log(event.target.value);
  };

  render() {
    const { searchField } = this.state;
    return (
      <div className="App">
        <Navigation />
        <SearchBox searchChange={this.onSearchChange} />
        <Chart getDailyChart={this.getDailyChart} searchField={searchField} />
        <FinancialDetails />
      </div>
    );
  }
}

export default App;
