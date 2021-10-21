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
          let timeSeries = data.body['Time Series (Intraday)'];
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
          this.setState({
            series: [{ data: result }],
          });
        }
      });
  };
  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  onSearchTicker = (target) => {
    if (target.charCode === 13) {
      const { searchField } = this.state;
      if (searchField !== '') {
        this.retrieveChartData(searchField);
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
