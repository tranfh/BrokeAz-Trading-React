import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import './Movers.css';

function Movers() {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);

  useEffect(() => {
    const getGainers = async () => {
      const response = await fetch(
        'https://enigmatic-brook-28051.herokuapp.com/gainers',
        {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!response.ok) {
        throw new Error(`Couldn't Fetch Gainers ${response.status}`);
      }
      const data = await response.json();
      setGainers(data.body.mostGainerStock.slice(0, 5));
    };

    const getLosers = async () => {
      const response = await fetch(
        'https://enigmatic-brook-28051.herokuapp.com/losers',
        {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!response.ok) {
        throw new Error(`Couldn't Fetch Losers ${response.status}`);
      }
      const data = await response.json();
      setLosers(data.body.mostLoserStock.slice(0, 5));
    };
    getGainers();
    getLosers();
  }, []);

  return (
    <div className="flex justify-center mh7 mv1 movers">
      <div className="pa2 ma2 w-50 gainers">
        <h3 className="gainers">
          Today's Gainers<span class="shade">&nbsp;</span>
        </h3>

        <Table striped bordered hover variant="dark" size="sm">
          <thead>
            <th>Symbol</th>
            <th>Last Price</th>
            <th>Change</th>
            <th>% Change</th>
          </thead>
          <tbody>
            {gainers.map(({ ticker, price, changes, changesPercentage }) => {
              return (
                <tr>
                  <td>{ticker}</td>
                  <td>{price}</td>
                  <td>{changes}</td>
                  <td>{changesPercentage}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className="pa2 ma2 w-50">
        <h3 className="losers">
          Today's Losers<span class="shade">&nbsp;</span>
        </h3>
        <Table striped bordered hover variant="dark" size="sm">
          <thead>
            <th>Symbol</th>
            <th>Last Price</th>
            <th>Change</th>
            <th>% Change</th>
          </thead>
          <tbody>
            {losers.map(({ ticker, price, changes, changesPercentage }) => {
              return (
                <tr>
                  <td>{ticker}</td>
                  <td>{price}</td>
                  <td>{changes}</td>
                  <td>{changesPercentage}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Movers;
