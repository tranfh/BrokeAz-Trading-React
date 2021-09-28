import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import './StockChart.css';

class StockChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
      metadata: {},
      timeSeries: {},
      candleDetails: [],
      options: {
        chart: {
          type: 'candlestick',
          height: 350,
        },
        title: {
          text: '',
          align: 'left',
        },
        xaxis: {
          type: 'datetime',
          color: '#FFFFF',
        },
        yaxis: {
          color: '#FFFFF',
          tooltip: {
            enabled: true,
          },
        },
      },
      series: [{ data: [] }],
    };
  }

  retrieveChartData = (ticker) => {
    console.log('starting fetch');
    return fetch(`http://localhost:3000/chart/daily/${ticker}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.body['Error Message']) {
          this.setState({ metadata: data.body['Meta Data'] });
          this.setState({ timeSeries: data.body['Time Series (Daily)'] });
          this.getStockData(this.state.timeSeries);
        }
      });
  };

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  getStockData = (timeSeries) => {
    let result = [];
    for (const time in timeSeries) {
      result.push([
        time,
        [
          timeSeries[time]['1. open'],
          timeSeries[time]['2. high'],
          timeSeries[time]['3. low'],
          timeSeries[time]['4. close'],
        ],
      ]);
    }
    this.setState({ candleDetails: result });
  };

  onSearchTicker = (target) => {
    if (target.charCode === 13) {
      const { searchField, candleDetails } = this.state;
      if (searchField !== '') {
        this.retrieveChartData(searchField);
        this.setState({ series: [{ data: candleDetails }] });
      }
    }
  };

  render() {
    const { options, series } = this.state;
    return (
      <div>
        <input
          className="searchbar pa3 ba b--green bg-lightest-blue"
          type="search"
          placeholder="Search Stocks"
          onChange={this.onSearchChange}
          onKeyPress={this.onSearchTicker}
        ></input>
        <div className="mixed-chart">
          <ReactApexChart
            options={options}
            series={series}
            type="candlestick"
            width="1000"
          />
        </div>
      </div>
    );
  }
}

export default StockChart;
