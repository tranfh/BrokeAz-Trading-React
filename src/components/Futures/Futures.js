import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class Futures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
      metadata: {},
      timeSeries: {},
      candleDetails: [],
      //   optionsSPY: {
      //     chart: {
      //       type: 'candlestick',
      //       height: 350,
      //     },
      //     title: {
      //       text: 'S&P 500',
      //       align: 'left',
      //     },
      //     xaxis: {
      //       type: 'datetime',
      //       color: '#FFFFF',
      //     },
      //     yaxis: {
      //       color: '#FFFFF',
      //       tooltip: {
      //         enabled: true,
      //       },
      //     },
      //   },
      //   seriesSPY: [{ data: [] }],
      //   optionsDOW: {
      //     chart: {
      //       type: 'candlestick',
      //       height: 350,
      //     },
      //     title: {
      //       text: 'DOW JONES',
      //       align: 'left',
      //     },
      //     xaxis: {
      //       type: 'datetime',
      //       color: '#FFFFF',
      //     },
      //     yaxis: {
      //       color: '#FFFFF',
      //       tooltip: {
      //         enabled: true,
      //       },
      //     },
      //   },
      //   seriesDOW: [{ data: [] }],
      //   optionsNASDAQ: {
      //     chart: {
      //       type: 'candlestick',
      //       height: 350,
      //     },
      //     title: {
      //       text: 'NASDAQ',
      //       align: 'left',
      //     },
      //     xaxis: {
      //       type: 'datetime',
      //       color: '#FFFFF',
      //     },
      //     yaxis: {
      //       color: '#FFFFF',
      //       tooltip: {
      //         enabled: true,
      //       },
      //     },
      //   },
      //   seriesCNASDAQ: [{ data: [] }],
      seriesNASDAQ: [
        {
          name: 'NASDAQ',
          data: [],
        },
      ],
      optionsNASDAQ: {
        chart: {
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'NASDAQ',
          align: 'center',
          style: {
            color: '#adadad',
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.7,
            opacityTo: 0.2,
            stops: [0, 90, 100],
          },
        },
        xaxis: {
          type: 'datetime',
        },
      },
      seriesDOW: [
        {
          name: 'DOW',
          data: [],
        },
      ],
      optionsDOW: {
        chart: {
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'DOW',
          align: 'center',
          style: {
            color: '#adadad',
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.7,
            opacityTo: 0.2,
            stops: [0, 90, 100],
          },
        },
        xaxis: {
          type: 'datetime',
        },
      },
      seriesSPY: [
        {
          name: 'S&P 500',
          data: [],
        },
      ],
      optionsSPY: {
        chart: {
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'S&P 500',
          align: 'center',
          style: {
            color: '#adadad',
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.7,
            opacityTo: 0.2,
            stops: [0, 90, 100],
          },
        },
        xaxis: {
          type: 'datetime',
        },
      },
    };
  }

  componentDidMount() {
    this.retrieveChartData('SPY');
    this.retrieveChartData('DIA');
    this.retrieveChartData('NDAQ');
  }

  retrieveChartData = (ticker) => {
    console.log('starting fetch');
    return fetch(
      `https://enigmatic-brook-28051.herokuapp.com/chart/intraday/${ticker}`,
      {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.body['Error Message']) {
          let timeSeries = data.body['Time Series (5min)'];
          let result = [];
          for (const time in timeSeries) {
            result.push([time, [timeSeries[time]['4. close']]]);
          }
          if (ticker === 'SPY') {
            this.setState({ seriesSPY: [{ data: result }] });
          } else if (ticker === 'DIA') {
            this.setState({ seriesDOW: [{ data: result }] });
          } else {
            this.setState({ seriesNASDAQ: [{ data: result }] });
          }
        }
      });
  };

  render() {
    const {
      optionsSPY,
      optionsDOW,
      optionsNASDAQ,
      seriesSPY,
      seriesDOW,
      seriesNASDAQ,
    } = this.state;
    return (
      <div className="flex justify-center">
        <div className="mixed-chart w-25 pa3 mr2">
          <ReactApexChart options={optionsDOW} series={seriesDOW} type="area" />
        </div>
        <div className="mixed-chart w-25 pa3 mr2">
          <ReactApexChart
            options={optionsNASDAQ}
            series={seriesNASDAQ}
            type="area"
          />
        </div>
        <div className="mixed-chart w-25 pa3 mr2">
          <ReactApexChart options={optionsSPY} series={seriesSPY} type="area" />
        </div>
      </div>
    );
  }
}

export default Futures;
