import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Table } from 'react-bootstrap';
import { DisappearedLoading } from 'react-loadingg';

function Trending() {
  const [reddit, setReddit] = useState([]);
  const [stocktwits, setStockTwits] = useState([]);
  const [twitter, setTwitter] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getTrending = async (fintwit) => {
      const response = await fetch(
        `http://localhost:3000/trending/${fintwit}`,
        {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!response.ok) {
        throw new Error(`Couldn't Fetch Trending ${response.status}`);
      }
      const data = await response.json();
      const array = await getStockData(data);
      if (fintwit === 'stocktwits') {
        setStockTwits(array);
      } else if (fintwit === 'reddit') {
        setReddit(array);
      } else {
        setTwitter(array);
      }
      return true;
    };

    const getStockData = async (array) => {
      console.log(array);
      let tempArray = [];
      for (let i = 0; i < array.length; i++) {
        let obj = {};
        let response = await fetch(`http://localhost:3000/quote/${array[i]}`, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`Couldn't Fetch Stock Data ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        if (data) {
          obj['symbol'] = array[i];
          obj['company'] = data['Global Quote']['01. symbol'];
          obj['price'] = data['Global Quote']['05. price'];
          obj['change'] = data['Global Quote']['09. change'];
          obj['changePercentage'] = data['Global Quote']['10. change percent'];
          obj['volume'] = data['Global Quote']['06. volume'];
        } else {
          obj['symbol'] = array[i];
          obj['company'] = '';
          obj['price'] = 0;
          obj['change'] = 0;
          obj['changePercentage'] = 0;
          obj['volume'] = 0;
        }
        tempArray.push(obj);
      }
      return tempArray;
    };

    const triggerLoad = () => {
      if (
        getTrending('stocktwits') &
        getTrending('reddit') &
        getTrending('twitter')
      ) {
        setLoading(false);
      }
    };

    triggerLoad();
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
      {isLoading ? (
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
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
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
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
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
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </div>
      ) : (
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
                  {reddit.map(
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
                  {twitter.map(
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
                  {stocktwits.map(
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
                  )}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
}
export default Trending;
