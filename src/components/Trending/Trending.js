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
            console.log(data);
            switch (fintwit) {
              case 'stocktwits':
                setStockTwits(data);
                break;
              case 'reddit':
                setReddit(data);
                break;
              case 'twitter':
                setTwitter(data);
                break;
              default:
                setReddit(data);
                break;
            }
          }
        });
    };

    const getStockData = async (array) => {
      for (const ticker in array) {
        return await fetch(`http://localhost:3000//search/${ticker}`, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => response.json)
          .then((data) => {
            return data;
          });
      }
    };

    getTrending('stocktwits');
    getTrending('reddit');
    getTrending('twitter');
    console.log(getStockData(['TSLA']));
  }, []);

  const getState = (fintwit) => {
    if (fintwit === 'stocktwits') {
      console.log(stocktwits.slice(0, 14));
    } else if (fintwit === 'reddit') {
      console.log(reddit.slice(0, 14));
    } else {
      console.log(twitter.slice(0, 14));
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
                <th>Market Cap</th>
              </thead>
              <tbody>
                {reddit ? (
                  reddit
                    .slice(0, 14)
                    .map(
                      ({
                        company,
                        price,
                        change,
                        changePercent,
                        volume,
                        marketCap,
                      }) => {
                        return (
                          <tr>
                            <td>{company}</td>
                            <td>{price}</td>
                            <td>{change}</td>
                            <td>{changePercent}</td>
                            <td>{volume}</td>
                            <td>{marketCap}</td>
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
                <th>Market Cap</th>
              </thead>
              <tbody>
                {twitter ? (
                  twitter
                    .slice(0, 14)
                    .map(
                      ({
                        company,
                        price,
                        change,
                        changePercent,
                        volume,
                        marketCap,
                      }) => {
                        return (
                          <tr>
                            <td>{company}</td>
                            <td>{price}</td>
                            <td>{change}</td>
                            <td>{changePercent}</td>
                            <td>{volume}</td>
                            <td>{marketCap}</td>
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
                <th>Market Cap</th>
              </thead>
              <tbody>
                {stocktwits ? (
                  stocktwits
                    .slice(0, 14)
                    .map(
                      ({
                        company,
                        price,
                        change,
                        changePercent,
                        volume,
                        marketCap,
                      }) => {
                        return (
                          <tr>
                            <td>{company}</td>
                            <td>{price}</td>
                            <td>{change}</td>
                            <td>{changePercent}</td>
                            <td>{volume}</td>
                            <td>{marketCap}</td>
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
