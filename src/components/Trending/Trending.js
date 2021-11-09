import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Loading from '../Loading/Loading';

function Trending() {
  const [reddit, setReddit] = useState([]);
  const [stocktwits, setStockTwits] = useState([]);
  const [twitter, setTwitter] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const triggerLoad = () => {
      getTrending('stocktwits');
      getTrending('twitter');

      if (getTrending('reddit')) {
        setLoading(false);
      }
    };

    triggerLoad();
  }, []);

  const getTrending = async (fintwit) => {
    // check database if the the latest time is within 15mins
    const response = await fetch(
      `https://enigmatic-brook-28051.herokuapp.com/trending/${fintwit}`,
      {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!response.ok) {
      throw new Error(`Couldn't Fetch Trending ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    // const array = await getStockData(data);
    if (fintwit === 'stocktwits') {
      setStockTwits(data);
    } else if (fintwit === 'reddit') {
      setReddit(data);
    } else {
      setTwitter(data);
    }
    return true;
  };

  // const getStockData = async (array) => {
  //   console.log(array);
  //   let tempArray = [];
  //   for (let i = 0; i < 5; i++) {
  //     let obj = {};
  //     let response = await fetch(`https://enigmatic-brook-28051.herokuapp.com/quote/${array[i]}`, {
  //       method: 'get',
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //     if (!response.ok) {
  //       throw new Error(`Couldn't Fetch Stock Data ${response.status}`);
  //     }
  //     let data = await response.json();
  //     console.log(data);
  //     if (data['Global Quote']) {
  //       obj['symbol'] = array[i];
  //       obj['company'] = data['Global Quote']['01. symbol'];
  //       obj['price'] = data['Global Quote']['05. price'];
  //       obj['change'] = data['Global Quote']['09. change'];
  //       obj['changePercentage'] = data['Global Quote']['10. change percent'];
  //       obj['volume'] = data['Global Quote']['06. volume'];
  //     }
  //     tempArray.push(obj);
  //   }
  //   return tempArray;
  // };};

  return (
    <div className="pa3 mh7 mv1">
      <div>
        <h4
          style={{ textAlign: 'center', color: '#cdcbcb' }}
          className="font trending"
        >
          Trending Tickers
        </h4>
      </div>
      {isLoading ? (
        <div>
          <Table striped bordered hover variant="dark" size="sm">
            <thead>
              <th>Reddit</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  {' '}
                  <Loading />
                </td>
              </tr>
            </tbody>
          </Table>
          <Table striped bordered hover variant="dark" size="sm">
            <thead>
              <th>Twitter</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  {' '}
                  <Loading />
                </td>
              </tr>
            </tbody>
          </Table>
          <Table striped bordered hover variant="dark" size="sm">
            <thead>
              <th>Stocktwits</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Loading />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="flex justify-center">
          <Table striped bordered hover variant="dark" size="sm">
            <thead>
              <th>Reddit</th>
            </thead>
            <tbody>
              {reddit.map((symbol) => {
                return (
                  <tr>
                    <td>{symbol}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Table striped bordered hover variant="dark" size="sm">
            <thead>
              <th>Twitter</th>
            </thead>
            <tbody>
              {twitter.map((symbol) => {
                return (
                  <tr>
                    <td>{symbol}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Table striped bordered hover variant="dark" size="sm">
            <thead>
              <th>Stocktwits</th>
            </thead>
            <tbody>
              {stocktwits.map((symbol) => {
                return (
                  <tr>
                    <td>{symbol}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
export default Trending;
