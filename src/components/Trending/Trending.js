import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Table } from 'react-bootstrap';
import { DisappearedLoading } from 'react-loadingg';

function Trending() {
  const [reddit, setReddit] = useState([]);
  const [stocktwits, setStockTwits] = useState([]);
  const [twitter, setTwitter] = useState([]);

  useEffect(() => {
    const getTrending = async (fintwit) => {
      return await fetch(`http://localhost:3000/trending/${fintwit}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            switch (fintwit) {
              case 'stocktwits':
                getStockData(data).then((response) => setStockTwits(response));
                break;
              case 'reddit':
                getStockData(data).then((response) => setReddit(response));
                break;
              case 'twitter':
                getStockData(data).then((response) => setTwitter(response));
                break;
              default:
                getStockData(data).then((response) => setReddit(response));
                break;
            }
          }
        });
    };

    const getStockData = (array) => {
      let tempArray = [];
      for (let i = 0; i < array.length; i++) {
        return fetch(`http://localhost:3000/quote/${array[i]}`, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => response.json())
          .then((data) => {
            let obj = {};
            obj['symbol'] = array[i];
            obj['company'] = data['Global Quote']['01. symbol'];
            obj['price'] = data['Global Quote']['05. price'];
            obj['change'] = data['Global Quote']['09. change'];
            obj['changePercentage'] =
              data['Global Quote']['10. change percent'];
            obj['volume'] = data['Global Quote']['06. volume'];
            console.log(obj);
            tempArray.push(obj);
            console.log(tempArray);
          });
      }
      return tempArray;
    };

    // getTrending('stocktwits')
    //   .then(getStockData(stocktwits))
    //   .then((data) => setStockTwits(data));
    getTrending('reddit');
    // getTrending('twitter')
    //   .then(getStockData(twitter))
    //   .then((data) => setTwitter(data));
  }, []);

  const getState = (fintwit) => {
    if (fintwit === 'stocktwits') {
      console.log(stocktwits);
    } else if (fintwit === 'reddit') {
      console.log(reddit);
    } else {
      console.log(twitter);
    }
  };
  return (
    <div className="pa3 mh7 mv1">
      <div>
        <h4
          style={{ textAlign: 'left', color: '#cdcbcb' }}
          className="font trending"
        >
          Trending Tickers
        </h4>
      </div>
      <div>
        <Tabs
          defaultActiveKey="Reddit"
          id="fintwit-tabs"
          onSelect={(k) => getState(k)}
          className="mb-3"
        >
          <Tab eventKey="reddit" title="Reddit">
            <Table striped bordered hover variant="dark" size="sm">
              <thead>
                <th>Symbol</th>
                <th>Name</th>
                <th>Last Price</th>
                <th>Change</th>
                <th>% Change</th>
                <th>Volume</th>
              </thead>
              <tbody>
                {reddit ? (
                  reddit
                    .slice(0, 14)
                    .map(
                      ({
                        symbol,
                        company,
                        price,
                        change,
                        changePercentage,
                        volume,
                      }) => {
                        return (
                          <tr>
                            <td>{symbol}</td>
                            <td>{company}</td>
                            <td>{price}</td>
                            <td>{change}</td>
                            <td>{changePercentage}</td>
                            <td>{volume}</td>
                          </tr>
                        );
                      }
                    )
                ) : (
                  <tr>
                    <td>
                      <DisappearedLoading />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="twitter" title="Twitter">
            <Table striped bordered hover variant="dark" size="sm">
              <thead>
                <th>Symbol</th>
                <th>Name</th>
                <th>Last Price</th>
                <th>Change</th>
                <th>% Change</th>
                <th>Volume</th>
              </thead>
              <tbody>
                {twitter ? (
                  twitter
                    .slice(0, 14)
                    .map(
                      ({
                        symbol,
                        company,
                        price,
                        change,
                        changePercentage,
                        volume,
                      }) => {
                        return (
                          <tr>
                            <td>{symbol}</td>
                            <td>{company}</td>
                            <td>{price}</td>
                            <td>{change}</td>
                            <td>{changePercentage}</td>
                            <td>{volume}</td>
                          </tr>
                        );
                      }
                    )
                ) : (
                  <tr>
                    <td>
                      <DisappearedLoading />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="stocktwits" title="StockTwits">
            <Table striped bordered hover variant="dark" size="sm">
              <thead>
                <th>Symbol</th>
                <th>Name</th>
                <th>Last Price</th>
                <th>Change</th>
                <th>% Change</th>
                <th>Volume</th>
              </thead>
              <tbody>
                {stocktwits ? (
                  stocktwits
                    .slice(0, 14)
                    .map(
                      ({
                        symbol,
                        company,
                        price,
                        change,
                        changePercentage,
                        volume,
                      }) => {
                        return (
                          <tr>
                            <td>{symbol}</td>
                            <td>{company}</td>
                            <td>{price}</td>
                            <td>{change}</td>
                            <td>{changePercentage}</td>
                            <td>{volume}</td>
                          </tr>
                        );
                      }
                    )
                ) : (
                  <tr>
                    <td>
                      <DisappearedLoading />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
export default Trending;
